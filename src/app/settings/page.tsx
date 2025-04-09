import UserSettingsForm from './settings-form';

export default async function UserSettings() {
  // Fetch current user settings, to be passed to the form
  return <UserSettingsForm />;
}
