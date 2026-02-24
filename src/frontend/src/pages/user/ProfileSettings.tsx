import { useState, useEffect } from 'react';
import { useAuth } from '../../contexts/AuthContext';
import { useUploadProfilePhoto } from '../../hooks/useQueries';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { toast } from 'sonner';
import { useActor } from '../../hooks/useActor';
import { Upload, User } from 'lucide-react';
import { ExternalBlob } from '../../backend';

export default function ProfileSettings() {
  const { userProfile, refreshProfile } = useAuth();
  const { actor } = useActor();
  const uploadProfilePhoto = useUploadProfilePhoto();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
  });
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [uploadingPhoto, setUploadingPhoto] = useState(false);

  useEffect(() => {
    if (userProfile) {
      setFormData({
        name: userProfile.name,
        phone: userProfile.phone,
      });
    }
  }, [userProfile]);

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (!file.type.startsWith('image/')) {
        toast.error('Please select an image file');
        return;
      }
      if (file.size > 5 * 1024 * 1024) {
        toast.error('Image size should be less than 5MB');
        return;
      }
      setSelectedFile(file);
      const url = URL.createObjectURL(file);
      setPreviewUrl(url);
    }
  };

  const handlePhotoUpload = async () => {
    if (!selectedFile) {
      toast.error('Please select an image first');
      return;
    }

    setUploadingPhoto(true);
    try {
      await uploadProfilePhoto.mutateAsync(selectedFile);
      await refreshProfile();
      toast.success('Profile photo updated successfully!');
      setSelectedFile(null);
      setPreviewUrl(null);
    } catch (error: any) {
      console.error('Upload error:', error);
      toast.error(error.message || 'Failed to upload profile photo');
    } finally {
      setUploadingPhoto(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.name.trim() || !formData.phone.trim()) {
      toast.error('Please fill in all fields');
      return;
    }

    setLoading(true);
    try {
      if (!actor) throw new Error('Actor not available');

      await actor.updateProfile(formData.name, formData.phone);
      await refreshProfile();
      toast.success('Profile updated successfully!');
    } catch (error: any) {
      console.error('Update error:', error);
      toast.error(error.message || 'Failed to update profile');
    } finally {
      setLoading(false);
    }
  };

  const currentPhotoUrl = userProfile?.profilePhotoUrl
    ? ExternalBlob.fromURL(userProfile.profilePhotoUrl).getDirectURL()
    : null;

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Profile Settings</h1>
        <p className="text-muted-foreground mt-1">Update your personal information</p>
      </div>

      {/* Profile Photo Section */}
      <Card className="max-w-2xl">
        <CardHeader>
          <CardTitle className="text-yellow-500">Profile Photo</CardTitle>
          <CardDescription>Upload or change your profile picture</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex flex-col items-center gap-4">
            {/* Current Photo Display */}
            <div className="w-32 h-32 rounded-full overflow-hidden bg-gray-100 dark:bg-gray-800 flex items-center justify-center border-4 border-yellow-500">
              {currentPhotoUrl ? (
                <img
                  src={currentPhotoUrl}
                  alt="Profile"
                  className="w-full h-full object-cover"
                />
              ) : (
                <User className="w-16 h-16 text-gray-400" />
              )}
            </div>

            {/* Preview of Selected Image */}
            {previewUrl && (
              <div className="w-32 h-32 rounded-full overflow-hidden bg-gray-100 dark:bg-gray-800 flex items-center justify-center border-4 border-green-500">
                <img
                  src={previewUrl}
                  alt="Preview"
                  className="w-full h-full object-cover"
                />
              </div>
            )}

            {/* File Input */}
            <div className="w-full max-w-sm">
              <Label htmlFor="photo-upload" className="cursor-pointer">
                <div className="flex items-center justify-center gap-2 px-4 py-2 border-2 border-dashed border-yellow-500 rounded-lg hover:bg-yellow-500/10 transition-colors">
                  <Upload className="w-5 h-5 text-yellow-500" />
                  <span className="text-sm font-medium text-yellow-500">
                    {selectedFile ? selectedFile.name : 'Choose Image'}
                  </span>
                </div>
              </Label>
              <Input
                id="photo-upload"
                type="file"
                accept="image/*"
                onChange={handleFileSelect}
                className="hidden"
              />
              <p className="text-xs text-muted-foreground mt-2 text-center">
                Max size: 5MB. Supported formats: JPG, PNG, GIF
              </p>
            </div>

            {/* Upload Button */}
            {selectedFile && (
              <Button
                onClick={handlePhotoUpload}
                disabled={uploadingPhoto}
                className="bg-green-600 hover:bg-green-700 text-white"
              >
                {uploadingPhoto ? 'Uploading...' : 'Upload Photo'}
              </Button>
            )}
          </div>
        </CardContent>
      </Card>

      {/* Personal Information Section */}
      <Card className="max-w-2xl">
        <CardHeader>
          <CardTitle className="text-yellow-500">Personal Information</CardTitle>
          <CardDescription>Update your name and phone number</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                value={userProfile?.email || ''}
                disabled
                className="bg-muted"
              />
              <p className="text-xs text-muted-foreground">Email cannot be changed</p>
            </div>

            <div className="space-y-2">
              <Label htmlFor="name">Full Name</Label>
              <Input
                id="name"
                type="text"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                placeholder="John Doe"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="phone">Phone Number</Label>
              <Input
                id="phone"
                type="tel"
                value={formData.phone}
                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                placeholder="9876543210"
              />
            </div>

            <Button 
              type="submit" 
              disabled={loading}
              className="bg-yellow-500 hover:bg-yellow-600 text-black"
            >
              {loading ? 'Updating...' : 'Update Profile'}
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
