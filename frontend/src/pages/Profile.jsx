import { useState } from "react";
import { Link } from "react-router";
import { Camera, Mail, User, Pen, Save, Trash2, XIcon, ArrowBigLeftDash} from "lucide-react";
import toast from "react-hot-toast";
import { useAuthStore } from "../store/useAuthStore.js"
import ConvertDateFormat from "../lib/dateFormat.js";
import ConfirmPopup from "../components/ConfirmPopup.jsx";


function Profile() {

  const { isUpdatingProfile, updateProfile, authUser, updateName, deleteProfilePicture, checkAuth } = useAuthStore();

  const [userName, setUserName] = useState(authUser.name);
  const [updateState, setUpdateState] = useState(false);
  const [saving, setSaving] = useState(false);
  const [isImageOpen, setIsImageOpen] = useState(false);
  const [selectImage, setSelectImage] = useState(null);
  const [dlt, isdlt] = useState(false);
  const [confirm, setConfirm] = useState(false);


  const handleImageUploader = async (e) => {
    const file = e.target.files[0];
    if (!file) return;
    if (!file.type.startsWith("image/")) {
      toast.error("Please upload a valid image file");
      return;
    }


    const reader = new FileReader();

    reader.readAsDataURL(file);

    reader.onload = async () => {
      const base64Img = reader.result;
      setSelectImage(base64Img);
      await updateProfile({ profilePic: base64Img });
    }
  }

  const deleteProfilePhoto = async () => {
    setConfirm(false);
    isdlt(true);
    try {
      await deleteProfilePicture();
      await checkAuth();
      setSelectImage(null);
      setIsImageOpen(false);
    } catch (error) {
      console.log(error);
    }
    finally {
      isdlt(false);
    }
  }

  const handleUpdateName = async () => {
    setUpdateState(false);
    setSaving(true);
    try {
      await updateName(userName);
    }
    catch (error) {
      console.log(error);
    }
    finally {
      setSaving(false);
    }
  }

  return (
    <div className="min-h-screen pt-20">
      <div className="max-w-2xl mx-auto p-4 py-4">
        <div className="bg-base-300 rounded-xl p-6 space-y-8">
          <div className="text-center relative ">
            <div className="absolute left-0 right-0  w-[10%]">
              <Link to={"/"} className="btn">
                <ArrowBigLeftDash className="text-base-content/80"/>
              </Link>
            </div>
            <h1 className="text-2xl font-semibold ">Profile</h1>
            <p className="mt-2 mb-3">Your Profile Information</p>

            {/* avatar upload section */}
            <div className="flex flex-col items-center gap-4">
              <div className="relative">
                <img
                  src={selectImage || authUser.profilePic || "/avatar.svg"}
                  alt="Profile"
                  className="size-32 rounded-[40px] object-cover drop-shadow-[0_0_8px_rgba(156,163,175,0.8)] cursor-pointer"
                  onClick={() => setIsImageOpen(true)}
                />

                {isImageOpen && (
                  <div
                    className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center z-50"
                  >
                    <div className="flex flex-col gap-6 items-center justify-center ">
                      {dlt ? "Deleting ..." : (
                        <div className="flex justify-between w-1/2 ">
                          <button className="btn btn-ghost " onClick={() => setConfirm(true)}>
                            <Trash2 className="text-gray-300"/>
                          </button>
                          <button className="btn btn-ghost text-gray-300 " onClick={() => setIsImageOpen(false)}>
                            <XIcon />
                          </button>
                        </div>
                      )}
                      <img
                        src={selectImage || authUser.profilePic || "/avatar.svg"}
                        alt="Full Size"
                        className="md:max-w-[50%] md:max-h-[50%] rounded-lg shadow-lg max-w-[80%] max-h-[70%] "
                        onClick={(e) => e.stopPropagation()} // Prevent closing when clicking the image
                      />
                    </div>

                    {confirm && (
                      <ConfirmPopup
                        message="Are you sure you want to Delete your Profile Pic ?"
                        onConfirm={deleteProfilePhoto}
                        onCancel={() => setConfirm(false)}
                      />
                    )}

                  </div>
                )}

                <label
                  htmlFor="avatar-upload"
                  className={`absolute bottom-0 right-0 bg-base-content hover:scale-105 p-2 rounded-full cursor-pointer transition-all duration-200 ${isUpdatingProfile ? "animate-pulse" : ""}`}
                >
                  <Camera className="size-5 text-base-200" />
                  <input
                    type="file"
                    id="avatar-upload"
                    className="hidden"
                    onChange={handleImageUploader}
                    disabled={isUpdatingProfile}
                  />
                </label>
              </div>
              <p className="text-sm text-base-content/80">
                {isUpdatingProfile ? "Uploading ..." : "Click the Camera Icon to Upload your Photo"}
              </p>
            </div>

            <div className="space-y-6 mt-6">
              <div className="space-y-1.5 mb-4">
                <div className="text-sm text-base-content/80 flex items-center gap-2 mb-2">
                  <User className="size-5" />
                  Full Name
                </div>
                <div className="relative">
                  {!updateState && (
                    <button className="btn round_1 absolute right-0 inset-y-0 z-10 flex items-center justify-between hover:text-yellow-300 " onClick={() => setUpdateState(true)}  >
                      <Pen className="" />
                      <span>Edit</span>
                    </button>
                  )}

                  {updateState && (
                    <button className="btn round_1 absolute right-0 inset-y-0 z-10 flex items-center justify-between hover:text-green-500 " onClick={handleUpdateName} >
                      <Save className="" />
                      {saving ? "Saving ..." : <span>Save</span>}
                    </button>
                  )}

                  <input
                    type="text"
                    className={`input w-full round_1 drop-shadow-[0_0_5px_rgba(156,163,175,0.8)] relative`}
                    disabled={!updateState}
                    value={userName}
                    onChange={(e) => setUserName(e.target.value)}
                    spellCheck={false}
                  >
                  </input>
                </div>
              </div>

              <div className="space-y-1.5">
                <div className="text-sm text-base-content/80 flex items-center gap-2 mb-2">
                  <Mail className="size-5" />
                  Email
                </div>
                <p className="px-4 py-2.5 bg-base-200 rounded-lg drop-shadow-[0_0_5px_rgba(156,163,175,0.8)] round_1 flex cursor-not-allowed text-base-content/80">{authUser?.email}</p>
              </div>
            </div>


            <div className="mt-6 bg-base-300 rounded-xl p-6">
              <div className="text-lg font-medium mb-4">
                <div className="space-y-3 text-sm ">
                  <div className="flex items-center justify-between py-2 border-b border-zinc-700 ">
                    <span>Member Since </span>
                    <span>{ConvertDateFormat(authUser.createdAt)}</span>
                  </div>
                  <div className="flex items-center justify-between py-2 border-b border-zinc-700 ">
                    <span>Account Status </span>
                    <span className="drop-shadow-[0_0_5px_rgba(34,197,94,0.6)] text-[#34ad60]">Active</span>
                  </div>
                </div>
              </div>
            </div>

          </div>
        </div>
      </div>
    </div>
  )
}

export default Profile
