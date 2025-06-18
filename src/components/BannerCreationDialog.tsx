
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger, DialogDescription } from "@/components/ui/dialog";
import { Plus } from "lucide-react";

interface BannerCreationDialogProps {
  onCreateBanner: (banner: any) => void;
}

const BannerCreationDialog = ({ onCreateBanner }: BannerCreationDialogProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [formData, setFormData] = useState({
    type: "top",
    title: "",
    description: "",
    ctaText: "",
    ctaLink: "",
    backgroundColor: "#4628dd",
    textColor: "white",
    isActive: true,
    displayPages: ["all"] as string[]
  });

  const availablePages = [
    { value: "all", label: "All Pages" },
    { value: "home", label: "Home Page" },
    { value: "categories", label: "Categories Page" },
    { value: "tools", label: "Tool Pages" },
    { value: "compare", label: "Compare Page" },
    { value: "developer", label: "Developer Dashboard" }
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newBanner = {
      id: Date.now().toString(),
      ...formData
    };
    onCreateBanner(newBanner);
    setIsOpen(false);
    setFormData({
      type: "top",
      title: "",
      description: "",
      ctaText: "",
      ctaLink: "",
      backgroundColor: "#4628dd",
      textColor: "white",
      isActive: true,
      displayPages: ["all"]
    });
  };

  const handlePageToggle = (pageValue: string) => {
    if (pageValue === "all") {
      setFormData({ ...formData, displayPages: ["all"] });
    } else {
      const currentPages = formData.displayPages.filter(p => p !== "all");
      if (currentPages.includes(pageValue)) {
        const newPages = currentPages.filter(p => p !== pageValue);
        setFormData({ ...formData, displayPages: newPages.length === 0 ? ["all"] : newPages });
      } else {
        setFormData({ ...formData, displayPages: [...currentPages, pageValue] });
      }
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button className="bg-gradient-to-r from-[#4628dd] to-[#6e3ce7]">
          <Plus className="h-4 w-4 mr-2" />
          Add Banner
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Create New Promotional Banner</DialogTitle>
          <DialogDescription>
            Create promotional banners to display across your website pages
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Banner Type
            </label>
            <select
              value={formData.type}
              onChange={(e) => setFormData({ ...formData, type: e.target.value })}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#4628dd] focus:border-transparent"
            >
              <option value="top">Top Banner</option>
              <option value="content">Content Banner</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Display on Pages
            </label>
            <div className="grid grid-cols-2 gap-2">
              {availablePages.map((page) => (
                <label key={page.value} className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    checked={formData.displayPages.includes(page.value)}
                    onChange={() => handlePageToggle(page.value)}
                    className="rounded border-gray-300 text-[#4628dd] focus:ring-[#4628dd]"
                  />
                  <span className="text-sm text-gray-700">{page.label}</span>
                </label>
              ))}
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Title *
            </label>
            <input
              type="text"
              required
              value={formData.title}
              onChange={(e) => setFormData({ ...formData, title: e.target.value })}
              placeholder="Enter banner title"
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#4628dd] focus:border-transparent"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Description
            </label>
            <textarea
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              placeholder="Enter banner description (optional)"
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#4628dd] focus:border-transparent"
              rows={3}
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                CTA Text *
              </label>
              <input
                type="text"
                required
                value={formData.ctaText}
                onChange={(e) => setFormData({ ...formData, ctaText: e.target.value })}
                placeholder="e.g., Learn More, Get Started"
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#4628dd] focus:border-transparent"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                CTA Link *
              </label>
              <input
                type="url"
                required
                value={formData.ctaLink}
                onChange={(e) => setFormData({ ...formData, ctaLink: e.target.value })}
                placeholder="https://example.com"
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#4628dd] focus:border-transparent"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Background Color
              </label>
              <input
                type="color"
                value={formData.backgroundColor}
                onChange={(e) => setFormData({ ...formData, backgroundColor: e.target.value })}
                className="w-full h-10 border border-gray-300 rounded-lg"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Text Color
              </label>
              <select
                value={formData.textColor}
                onChange={(e) => setFormData({ ...formData, textColor: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#4628dd] focus:border-transparent"
              >
                <option value="white">White</option>
                <option value="black">Black</option>
                <option value="gray">Gray</option>
              </select>
            </div>
          </div>

          <div className="flex items-center space-x-2">
            <input
              type="checkbox"
              id="isActive"
              checked={formData.isActive}
              onChange={(e) => setFormData({ ...formData, isActive: e.target.checked })}
              className="rounded border-gray-300 text-[#4628dd] focus:ring-[#4628dd]"
            />
            <label htmlFor="isActive" className="text-sm text-gray-700">
              Activate banner immediately
            </label>
          </div>

          <div className="flex justify-end space-x-2 pt-4">
            <Button type="button" variant="outline" onClick={() => setIsOpen(false)}>
              Cancel
            </Button>
            <Button type="submit" className="bg-gradient-to-r from-[#4628dd] to-[#6e3ce7]">
              Create Banner
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default BannerCreationDialog;
