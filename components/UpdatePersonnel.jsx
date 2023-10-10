import { useState, useEffect } from "react";
import { Input } from "./ui/input";
import { Loader2, User2, Users2, X } from "lucide-react";
import { Button } from "./ui/button";
import { useToast } from "./ui/use-toast";

const UpdatePersonnel = ({ changeDisplayState, personnel }) => {
  const [formData, setFormData] = useState({ ...personnel });
  const [isLoading, setIsLoading] = useState(false);
  const [Personnel, setPersonnel] = useState([]);

  const { toast } = useToast();

  const handleDataFetch = async () => {
    try {
      const res = await fetch("/api/personnel", {
        method: "GET",
      });

      const data = await res.json();

      setPersonnel(data);
    } catch (error) {}
  };

  // function to handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    setIsLoading((prev) => (prev ? false : true));

    try {
      if (formData.reportsTo === null)
        return toast({
          description: "Please select who the personnel reports to",
          variant: "destructive",
          title: "Error",
        });

      const res = await fetch("/api/personnel", {
        method: "PUT",
        body: JSON.stringify(formData),
        headers: {
          "Content-Type": "application/json",
        },
      });

      const data = await res.json();

      if (data.error)
        return toast({
          description: data.error,
          variant: "destructive",
          title: "Error",
        });

      toast({ description: data.success, title: "Success" });

      changeDisplayState((prev) => (prev ? false : true));

      setFormData({ name: "", role: "", reportsTo: null });
    } catch (error) {
      toast({
        name: "",
        role: "",
        reportsTo: null,
      });
    } finally {
      setIsLoading((prev) => (prev ? false : true));
    }
  };

  useEffect(() => {
    handleDataFetch();
  }, []);

  return (
    <div className="fixed top-[10%] lg:right-[30%] lg:left-[30%] sm:right-[20%] sm:left-[20%] right-[10%] left-[10%] px-4 py-8 rounded-md shadow-md z-50 bg-white">
      <div
        className="absolute top-4 right-4"
        onClick={() => changeDisplayState((prev) => (prev ? false : true))}
      >
        <X size={25} className="cursor-pointer" />
      </div>

      <form onSubmit={handleSubmit}>
        <div className="py-2">
          <h3 className="text-center text-2xl">
            Update Personnel's Information
          </h3>
        </div>

        <div className="py-4 px-10">
          <div className="relative py-2">
            <User2 className="absolute top-3 left-2" />

            <Input
              type="text"
              placeholder="Personnel Name"
              className="text-base pl-10"
              name="name"
              onChange={(e) =>
                setFormData({ ...formData, [e.target.name]: e.target.value })
              }
              value={formData.name}
            />
          </div>

          <div className="relative py-2">
            <Input
              type="text"
              placeholder="Personnel's Role"
              className="text-base pl-10"
              name="role"
              onChange={(e) =>
                setFormData({ ...formData, [e.target.name]: e.target.value })
              }
              value={formData.role}
            />
          </div>

          <div className="relative py-2">
            <Users2 className="absolute top-3 left-2" />

            <select
              name="reportsTo"
              id="reportsTo"
              className="py-2 border-[1.9px] border-slate-200 rounded-md pl-8 w-full cursor-pointer"
              onChange={(e) =>
                setFormData({ ...formData, [e.target.name]: e.target.value })
              }
              value={formData.reportsTo}
            >
              <option>Reports To --</option>
              <option value="">None</option>
              {Personnel.length > 0 &&
                Personnel.map((personnel, index) => (
                  <option key={personnel._id} value={personnel._id}>
                    {personnel.role}
                  </option>
                ))}
            </select>
          </div>

          <div className="py-3">
            <Button type="submit">{isLoading && <Loader2 />} Update</Button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default UpdatePersonnel;
