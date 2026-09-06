import { CheckIcon, MapIcon, PencilIcon, Trash2Icon } from "lucide-react";
import toast from "react-hot-toast";
import api from "../config/api";
import { useAuth } from "../context/AuthContext";
import type { Address } from "../types";

interface AddressCardProps {
  address: Address;
  onEditHandler: (address: Address) => void;
  setAddresses: (addresses: Address[]) => void;
}

const AddressCard = ({
  address,
  onEditHandler,
  setAddresses,
}: AddressCardProps) => {
  const { updateUser } = useAuth();

  const handleDelete = async (id: string) => {
    try {
      const confirm = window.confirm(
        "Are you sure you want to delete this address?",
      );

      if (!confirm) {
        return;
      }

      const { data } = await api.delete(`/addresses/${id}`);
      setAddresses(data.addresses);
      updateUser({ addresses: data.addresses });
      toast.success("Address removed");
    } catch (error: any) {
      toast.error(error?.response?.data?.message || error?.message);
    }
  };

  return (
    <div
      key={address.id}
      className="max-w-3xl bg-white rounded-2xl p-6 flex items-start justify-between"
    >
      {/* Left */}
      <div className="flex gap-4">
        <div className="size-10 rounded-xl bg-app-cream flex-center shrink-0">
          <MapIcon className="size-5 text-app-green" />
        </div>
        <div>
          <div className="flex items-center gap-2 mb-1">
            <p className="text-sm font-semibold text-app-green">
              {address.label}
            </p>
            {address.isDefault && (
              <span className="flex-center gap-1 px-2.5 py-0.5 text-[10px] font-medium bg-app-green text-white rounded-full">
                <CheckIcon className="size-2.5" /> Default
              </span>
            )}
          </div>
          <p className="text-sm text-app-text-light">
            {address.address}, {address.city}, <br /> {address.state},{" "}
            {address.zip}
          </p>
        </div>
      </div>

      {/* Right - action buttons */}
      <div className="flex items-center gap-1">
        <button
          onClick={() => onEditHandler(address)}
          className="p-2 text-app-text-light hover:text-app-green hover:bg-app-cream rounded-lg transition-colors"
        >
          <PencilIcon className="size-4" />
        </button>

        <button
          onClick={() => handleDelete(address.id)}
          className="p-2 text-app-text-light hover:text-app-error hover:bg-red-50 rounded-lg transition-colors"
        >
          <Trash2Icon className="size-4" />
        </button>
      </div>
    </div>
  );
};

export default AddressCard;
