import ProfileForm from '@/components/profile/ProfileForm';
import PageHeader from '@/components/shared/PageHeader';

export default function ProfilePage() {
  return (
    <div className="max-w-4xl mx-auto">
      {/* PageHeader can be used here if a global page title is desired outside the form card
      <PageHeader 
        title="My Profile" 
        description="Update your personal information and preferences." 
      />
      */}
      <ProfileForm />
    </div>
  );
}
