import express from 'express';
const router = express.Router();
import formidable from 'formidable';

import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

const { FRONTEND_ORIGIN } = process.env;

import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

import { verifyUser } from '../utils/auth.js';
import { uploadImage } from '../utils/upload-image.js';
import passportGoogle from '../utils/google-oauth2.js';
import passportFacebook from '../utils/fb-oauth2.js';
import passportDiscord from '../utils/discord-oauth2.js';

import NodeCache from 'node-cache';
const usersCache = new NodeCache({ stdTTL: 60 * 5 });
router.get('/', async (req, res) => {
  return res.send('Users Endpoint');
});
router.get('/discord', passportDiscord.authenticate('discord'));
router.get('/discord/callback', passportDiscord.authenticate('discord', { session: true }), async (req, res) => {
  const user = await prisma.user.findUnique({
    where: {
      id: req.user.id,
    },
    include: {
      postInteractions: true,
      branchInteractions: true,
    },
  });

  let access_token = jwt.sign(
    {
      id: user.id,
      email: user.email,
      username: user.username,
      nickname: user.nickname,
      avatar: user.avatar,
      role: user.role,
      postInteractions: user.postInteractions,
      branchInteractions: user.branchInteractions,
      followedBy: user.followedBy,
    },
    process.env.JWT_SECRET
  );
  res.redirect(FRONTEND_ORIGIN + '/jwt?code=' + access_token);
});

router.get('/facebook', passportFacebook.authenticate('facebook', { scope: ['email'] }));
router.get('/facebook/callback', passportFacebook.authenticate('facebook', { session: true }), async (req, res) => {
  await prisma.facebook.update({
    where: {
      userId: req.user.id,
    },
    data: {
      accessToken: req.query.code,
    },
  });
  const user = await prisma.user.findUnique({
    where: {
      id: req.user.id,
    },
    include: {
      postInteractions: true,
      branchInteractions: true,
    },
  });

  let access_token = jwt.sign(
    {
      id: user.id,
      email: user.email,
      username: user.username,
      nickname: user.nickname,
      avatar: user.avatar,
      role: user.role,
      postInteractions: user.postInteractions,
      branchInteractions: user.branchInteractions,
      followedBy: user.followedBy,
    },
    process.env.JWT_SECRET
  );
  res.redirect(FRONTEND_ORIGIN + '/jwt?code=' + access_token);
});

router.get('/google', passportGoogle.authenticate('google'));
router.get('/google/callback', passportGoogle.authenticate('google', { session: true }), async (req, res) => {
  await prisma.google.update({
    where: {
      userId: req.user.id,
    },
    data: {
      accessToken: req.query.code,
    },
  });
  const user = await prisma.user.findUnique({
    where: {
      id: req.user.id,
    },
    include: {
      postInteractions: true,
      branchInteractions: true,
    },
  });

  let access_token = jwt.sign(
    {
      id: user.id,
      email: user.email,
      username: user.username,
      nickname: user.nickname,
      avatar: user.avatar,
      role: user.role,
      postInteractions: user.postInteractions,
      branchInteractions: user.branchInteractions,
      followedBy: user.followedBy,
    },
    process.env.JWT_SECRET
  );
  res.redirect(FRONTEND_ORIGIN + '/jwt?code=' + access_token);
});

/*
POST - Register or Log in User
REQ - email, password
RES - 200 - JWT with User Data
*/
router.post('/sign-in', async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!(email && password)) {
      throw new Error('Input fields missing');
    }
    const existingUser = await prisma.user.findUnique({
      where: {
        email: email,
      },
      include: {
        postInteractions: true,
        branchInteractions: true,
      },
    });

    let access_token;
    if (existingUser) {
      if (!existingUser.password) {
        throw new Error("User hasn't set a password");
      }
      let pwdCheck = await bcrypt.compare(password, existingUser.password);
      if (!pwdCheck) {
        throw new Error('Invalid Password');
      }
      access_token = jwt.sign(
        {
          id: existingUser.id,
          email: existingUser.email,
          username: existingUser.username,
          nickname: existingUser.nickname,
          avatar: existingUser.avatar,
          role: existingUser.role,
          postInteractions: existingUser.postInteractions,
          branchInteractions: existingUser.branchInteractions,
          followedBy: existingUser.followedBy,
        },
        process.env.JWT_SECRET
      );
    } else {
      let encryptedPassword = await bcrypt.hash(password, 10);
      const newUser = await prisma.user.create({
        data: {
          username: email.toLowerCase().split('@')[0],
          email: email.toLowerCase(),
          password: encryptedPassword,
        },
        include: {
          postInteractions: true,
          branchInteractions: true,
        },
      });
      access_token = jwt.sign(
        {
          id: newUser.id,
          email: newUser.email,
          username: newUser.username,
          nickname: newUser.nickname,
          avatar: newUser.avatar,
          role: newUser.role,
          postInteractions: newUser.postInteractions,
          branchInteractions: newUser.branchInteractions,
          followedBy: newUser.followedBy,
        },
        process.env.JWT_SECRET
      );
    }
    res.send({ access_token });
  } catch (err) {
    if (err) {
      res.status(500).send({ message: err.message });
    } else {
      throw new Error('An unknown error occurred');
    }
  } finally {
    await prisma.$disconnect();
  }
});

/*
GET - Logged User Info
REQ - email, password
RES - 200 - User Data
*/
router.get('/info', async (req, res) => {
  try {
    const user = await verifyUser(req.header('authorization'));
    if (!user) {
      throw new Error('No user found');
    }
    return res.send(user);
  } catch (err) {
    if (err) {
      res.status(500).send(err);
    } else {
      throw new Error('An unknown error occurred');
    }
  } finally {
    await prisma.$disconnect();
  }
});

/*
POST - User Settings
REQ - username, nickname, email, avatar, password
RES - 200 - JWT with User Data
*/
router.post('/settings', async (req, res) => {
  try {
    const user = await verifyUser(req.header('authorization'));
    if (!user) {
      throw new Error('No user found');
    }
    const form = formidable({});
    form.parse(req, async (err, fields, files) => {
      if (err) {
        throw new Error(err);
      }
      const encryptedPassword = await bcrypt.hash(fields.password[0], 10);
      const avatar = await uploadImage('avatars', files.avatar[0], user.id);

      const newUser = await prisma.user.update({
        where: {
          id: user.id,
        },
        data: {
          username: fields.username[0] ? fields.username[0] : user.username,
          nickname: fields.nickname[0] ? fields.nickname[0] : user.nickname,
          email: fields.email[0] ? fields.email[0] : user.email,
          avatar: avatar,
          password: encryptedPassword,
        },
        include: {
          postInteractions: true,
          branchInteractions: true,
        },
      });
      let access_token = jwt.sign(
        {
          id: newUser.id,
          email: newUser.email,
          username: newUser.username,
          nickname: newUser.nickname,
          avatar: newUser.avatar,
          role: newUser.role,
          postInteractions: newUser.postInteractions,
          branchInteractions: newUser.branchInteractions,
          followedBy: newUser.followedBy,
        },
        process.env.JWT_SECRET
      );
      res.send({ access_token });
    });
  } catch (err) {
    if (err) {
      res.status(500).send(err);
    } else {
      throw new Error('An unknown error occurred');
    }
  } finally {
    await prisma.$disconnect();
  }
});

/*
POST - Get User Follows
REQ - 
RES - 200 - Multiple User Data
*/
router.get('/follows', async (req, res) => {
  try {
    const user = await verifyUser(req.header('authorization'));
    if (!user) {
      throw new Error('No user found');
    }
    const follows = await prisma.user.findMany({
      where: {
        followedBy: {
          has: user.id,
        },
      },
      include: {
        projects: {
          include: {
            author: true,
            permissions: true,
          },
        },
        branches: {
          include: {
            author: true,
            permissions: true,
            project: {
              include: {
                permissions: true,
              },
            },
            interactions: {
              include: {
                user: true,
              },
            },
          },
        },
        posts: {
          include: {
            author: true,
            branch: {
              include: {
                permissions: true,
                project: {
                  include: {
                    permissions: true,
                  },
                },
              },
            },
            interactions: {
              include: {
                user: true,
              },
            },
          },
        },
        postInteractions: {
          include: {
            post: {
              include: {
                author: true,
                branch: {
                  include: {
                    permissions: true,
                    project: {
                      include: {
                        permissions: true,
                      },
                    },
                  },
                },
                interactions: {
                  include: {
                    user: true,
                  },
                },
              },
            },
          },
        },
        branchInteractions: {
          include: {
            branch: {
              include: {
                author: true,
                project: {
                  include: {
                    permissions: true,
                  },
                },
                permissions: true,
                interactions: {
                  include: {
                    user: true,
                  },
                },
              },
            },
          },
        },
      },
    });

    return res.send(follows);
  } catch (err) {
    if (err) {
      res.status(500).send(err);
    } else {
      throw new Error('An unknown error occurred');
    }
  } finally {
    await prisma.$disconnect();
  }
});

/*
GET - Specific User Info
REQ - email, password
RES - 200 - User Data
*/
router.get('/:id', async (req, res) => {
  try {
    if (usersCache.has(req.params.id)) {
      return res.send(usersCache.get(req.params.id));
    }
    const user = await prisma.user.findUnique({
      where: {
        id: req.params.id,
      },
      include: {
        projects: {
          include: {
            author: true,
            permissions: true,
          },
        },
        branches: {
          include: {
            author: true,
            permissions: true,
            project: {
              include: {
                permissions: true,
              },
            },
            interactions: {
              include: {
                user: true,
              },
            },
          },
        },
        posts: {
          include: {
            author: true,
            branch: {
              include: {
                permissions: true,
                project: {
                  include: {
                    permissions: true,
                  },
                },
              },
            },
            interactions: {
              include: {
                user: true,
              },
            },
          },
        },
        postInteractions: {
          include: {
            post: {
              include: {
                author: true,
                branch: {
                  include: {
                    permissions: true,
                    project: {
                      include: {
                        permissions: true,
                      },
                    },
                  },
                },
                interactions: {
                  include: {
                    user: true,
                  },
                },
              },
            },
          },
        },
        branchInteractions: {
          include: {
            branch: {
              include: {
                author: true,
                project: {
                  include: {
                    permissions: true,
                  },
                },
                permissions: true,
                interactions: {
                  include: {
                    user: true,
                  },
                },
              },
            },
          },
        },
      },
    });
    if (!user) {
      throw new Error('No user found');
    }
    usersCache.set(req.params.id, user);
    return res.send(user);
  } catch (err) {
    if (err) {
      res.status(500).send(err);
    } else {
      throw new Error('An unknown error occurred');
    }
  } finally {
    await prisma.$disconnect();
  }
});

/*
POST - Follow User
REQ - userId
RES - 200 - User Data
*/
router.post('/:id/follow', async (req, res) => {
  try {
    let user = await prisma.user.findUnique({
      where: {
        id: req.params.id,
      },
    });
    let profile = await prisma.user.findUnique({
      where: {
        id: req.body.profileId,
      },
    });
    if (!user || !profile) {
      throw new Error('No user found');
    }

    profile = await prisma.user.update({
      where: {
        id: profile.id,
      },
      data: {
        followedBy: {
          push: user.id,
        },
      },
    });

    profile = await prisma.user.findUnique({
      where: {
        id: profile.id,
      },
      include: {
        projects: {
          include: {
            author: true,
            permissions: true,
          },
        },
        branches: {
          include: {
            author: true,
            permissions: true,
            project: true,
            interactions: {
              include: {
                user: true,
              },
            },
          },
        },
        posts: {
          include: {
            author: true,
            branch: true,
            interactions: {
              include: {
                user: true,
              },
            },
          },
        },
        postInteractions: {
          include: {
            post: {
              include: {
                author: true,
                branch: true,
                interactions: {
                  include: {
                    user: true,
                  },
                },
              },
            },
          },
        },
        branchInteractions: {
          include: {
            branch: {
              include: {
                author: true,
                project: true,
                permissions: true,
                interactions: {
                  include: {
                    user: true,
                  },
                },
              },
            },
          },
        },
      },
    });
    return res.send(profile);
  } catch (err) {
    if (err) {
      res.status(500).send(err);
    } else {
      throw new Error('An unknown error occurred');
    }
  } finally {
    await prisma.$disconnect();
  }
});

/*
POST - Unfollow User
REQ - userId
RES - 200 - User Data
*/
router.post('/:id/unfollow', async (req, res) => {
  try {
    let user = await prisma.user.findUnique({
      where: {
        id: req.params.id,
      },
    });
    let profile = await prisma.user.findUnique({
      where: {
        id: req.body.profileId,
      },
    });
    if (!user || !profile) {
      throw new Error('No user found');
    }
    const removedProfileArray = profile.followedBy.filter((e) => e !== user.id);

    profile = await prisma.user.update({
      where: {
        id: profile.id,
      },
      data: {
        followedBy: removedProfileArray,
      },
    });

    profile = await prisma.user.findUnique({
      where: {
        id: profile.id,
      },
      include: {
        projects: {
          include: {
            author: true,
            permissions: true,
          },
        },
        branches: {
          include: {
            author: true,
            permissions: true,
            project: true,
            interactions: {
              include: {
                user: true,
              },
            },
          },
        },
        posts: {
          include: {
            author: true,
            branch: true,
            interactions: {
              include: {
                user: true,
              },
            },
          },
        },
        postInteractions: {
          include: {
            post: {
              include: {
                author: true,
                branch: true,
                interactions: {
                  include: {
                    user: true,
                  },
                },
              },
            },
          },
        },
        branchInteractions: {
          include: {
            branch: {
              include: {
                author: true,
                project: true,
                permissions: true,
                interactions: {
                  include: {
                    user: true,
                  },
                },
              },
            },
          },
        },
      },
    });
    return res.send(profile);
  } catch (err) {
    if (err) {
      res.status(500).send(err);
    } else {
      throw new Error('An unknown error occurred');
    }
  } finally {
    await prisma.$disconnect();
  }
});

export default router;
