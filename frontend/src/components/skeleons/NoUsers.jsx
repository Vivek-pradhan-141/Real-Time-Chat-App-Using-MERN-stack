import { Users } from "lucide-react";

const NoUsers = () => {
  return (
    <div className="w-full max-w-sm mx-auto mt-6 rounded-2xl   ">
      <div className="flex flex-col items-center justify-center p-8 space-y-4 text-center">
        <div className="flex items-center justify-center w-16 h-16 rounded-full bg-gray-100">
          <Users className="w-8 h-8 text-gray-500" />
        </div>
        <h2 className="text-lg font-semibold text-gray-700">No Online Users</h2>
        <p className="text-sm text-gray-500">
          It looks a little quiet here. Invite friends or check back later.
        </p>
      </div>
    </div>
  );
};

export default NoUsers;
