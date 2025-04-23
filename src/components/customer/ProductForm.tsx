
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/components/ui/use-toast";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";

// Mock vendors for selection
const mockVendors = [
  { id: "v1", name: "Acme Supplies" },
  { id: "v2", name: "Best Value Industrial" },
  { id: "v3", name: "Quality Manufacturing Co." },
  { id: "v4", name: "Precision Parts Ltd." },
  { id: "v5", name: "Global Materials" },
];

// Product categories
const productCategories = [
  "Electronics",
  "Furniture",
  "Clothing",
  "Office Supplies",
  "Raw Materials",
  "Machinery",
  "Custom Parts",
  "Other",
];

export default function ProductForm() {
  const { toast } = useToast();
  const navigate = useNavigate();

  // Form state
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    category: "",
    quantity: "1",
    targetPrice: "",
    images: [] as File[],
    imageUrls: [] as string[],
    selectedVendors: [] as string[],
  });
  
  // Handle input changes
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // Handle category selection
  const handleCategoryChange = (value: string) => {
    setFormData((prev) => ({ ...prev, category: value }));
  };

  // Handle image upload
  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files || e.target.files.length === 0) {
      return;
    }

    const newImages = Array.from(e.target.files);
    const newImageUrls = newImages.map((file) => URL.createObjectURL(file));

    setFormData((prev) => ({
      ...prev,
      images: [...prev.images, ...newImages],
      imageUrls: [...prev.imageUrls, ...newImageUrls],
    }));
  };

  // Remove an uploaded image
  const removeImage = (index: number) => {
    const newImages = [...formData.images];
    const newImageUrls = [...formData.imageUrls];
    
    // Revoke the object URL to prevent memory leaks
    URL.revokeObjectURL(newImageUrls[index]);
    
    newImages.splice(index, 1);
    newImageUrls.splice(index, 1);
    
    setFormData((prev) => ({
      ...prev,
      images: newImages,
      imageUrls: newImageUrls,
    }));
  };

  // Handle vendor selection
  const handleVendorToggle = (vendorId: string) => {
    setFormData((prev) => {
      const isSelected = prev.selectedVendors.includes(vendorId);
      
      if (isSelected) {
        return {
          ...prev,
          selectedVendors: prev.selectedVendors.filter(id => id !== vendorId),
        };
      } else {
        return {
          ...prev,
          selectedVendors: [...prev.selectedVendors, vendorId],
        };
      }
    });
  };

  // Navigate to next step
  const nextStep = () => {
    // Validate current step
    if (step === 1) {
      if (!formData.name || !formData.description || !formData.category) {
        toast({
          title: "Missing information",
          description: "Please fill in all required fields",
          variant: "destructive",
        });
        return;
      }
    } else if (step === 2) {
      if (formData.images.length === 0) {
        toast({
          title: "Missing images",
          description: "Please upload at least one product image",
          variant: "destructive",
        });
        return;
      }
    }

    setStep((prev) => prev + 1);
  };

  // Go back to previous step
  const prevStep = () => {
    setStep((prev) => prev - 1);
  };

  // Handle form submission
  const handleSubmit = () => {
    if (formData.selectedVendors.length === 0) {
      toast({
        title: "No vendors selected",
        description: "Please select at least one vendor",
        variant: "destructive",
      });
      return;
    }

    console.log("Form submitted:", formData);
    
    // Show success message
    toast({
      title: "Product Submitted",
      description: "Your product has been submitted for quotes",
    });

    // Redirect to dashboard
    navigate("/dashboard");
  };

  return (
    <div className="w-full max-w-3xl mx-auto">
      {/* Progress indicator */}
      <div className="flex justify-center mb-8">
        <div className="flex items-center">
          <div className={`step-indicator ${step >= 1 ? "active" : ""}`}>1</div>
          <div className="w-16 h-1 bg-gray-200 mx-2">
            <div 
              className="h-1 bg-primary" 
              style={{ width: step > 1 ? "100%" : "0%" }}
            ></div>
          </div>
          <div className={`step-indicator ${step >= 2 ? "active" : ""}`}>2</div>
          <div className="w-16 h-1 bg-gray-200 mx-2">
            <div 
              className="h-1 bg-primary" 
              style={{ width: step > 2 ? "100%" : "0%" }}
            ></div>
          </div>
          <div className={`step-indicator ${step >= 3 ? "active" : ""}`}>3</div>
        </div>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>
            {step === 1 && "Product Details"}
            {step === 2 && "Upload Images"}
            {step === 3 && "Select Vendors"}
          </CardTitle>
          <CardDescription>
            {step === 1 && "Enter basic information about your product"}
            {step === 2 && "Upload images of your product"}
            {step === 3 && "Select vendors to receive quote requests"}
          </CardDescription>
        </CardHeader>
        <CardContent>
          {/* Step 1: Product Details */}
          {step === 1 && (
            <div className="space-y-4">
              <div>
                <Label htmlFor="name">Product Name*</Label>
                <Input
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="Enter product name"
                  required
                />
              </div>

              <div>
                <Label htmlFor="category">Category*</Label>
                <Select
                  value={formData.category}
                  onValueChange={handleCategoryChange}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select a category" />
                  </SelectTrigger>
                  <SelectContent>
                    {productCategories.map((category) => (
                      <SelectItem key={category} value={category}>
                        {category}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label htmlFor="description">Description*</Label>
                <Textarea
                  id="description"
                  name="description"
                  value={formData.description}
                  onChange={handleChange}
                  placeholder="Describe your product in detail"
                  rows={4}
                  required
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="quantity">Quantity</Label>
                  <Input
                    id="quantity"
                    name="quantity"
                    type="number"
                    min="1"
                    value={formData.quantity}
                    onChange={handleChange}
                  />
                </div>
                <div>
                  <Label htmlFor="targetPrice">Target Price (Optional)</Label>
                  <Input
                    id="targetPrice"
                    name="targetPrice"
                    type="number"
                    min="0"
                    step="0.01"
                    value={formData.targetPrice}
                    onChange={handleChange}
                    placeholder="$0.00"
                  />
                </div>
              </div>
            </div>
          )}

          {/* Step 2: Image Upload */}
          {step === 2 && (
            <div className="space-y-6">
              <div>
                <Label htmlFor="images">Product Images*</Label>
                <div className="mt-2">
                  <div className="flex items-center justify-center w-full">
                    <label
                      htmlFor="upload"
                      className="flex flex-col items-center justify-center w-full h-32 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 hover:bg-gray-100"
                    >
                      <div className="flex flex-col items-center justify-center pt-5 pb-6">
                        <svg
                          className="w-8 h-8 mb-2 text-gray-500"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"
                          ></path>
                        </svg>
                        <p className="mb-2 text-sm text-gray-500">
                          <span className="font-semibold">Click to upload</span> or drag and drop
                        </p>
                        <p className="text-xs text-gray-500">
                          SVG, PNG, JPG or GIF (MAX. 800x400px)
                        </p>
                      </div>
                      <Input
                        id="upload"
                        type="file"
                        accept="image/*"
                        multiple
                        className="hidden"
                        onChange={handleImageUpload}
                      />
                    </label>
                  </div>
                </div>
              </div>

              {/* Preview uploaded images */}
              {formData.imageUrls.length > 0 && (
                <div>
                  <h3 className="text-sm font-medium mb-2">Uploaded Images</h3>
                  <div className="grid grid-cols-3 gap-4">
                    {formData.imageUrls.map((url, index) => (
                      <div key={index} className="relative">
                        <img
                          src={url}
                          alt={`Product image ${index + 1}`}
                          className="h-24 w-full object-cover rounded-md"
                        />
                        <button
                          type="button"
                          className="absolute top-1 right-1 bg-red-500 text-white rounded-full p-1 w-5 h-5 flex items-center justify-center text-xs"
                          onClick={() => removeImage(index)}
                        >
                          ×
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}

          {/* Step 3: Vendor Selection */}
          {step === 3 && (
            <div className="space-y-4">
              <p className="text-sm text-gray-500 mb-4">
                Select vendors to request quotes from. They will be notified about your product.
              </p>
              
              <div className="border rounded-md divide-y">
                {mockVendors.map((vendor) => (
                  <div
                    key={vendor.id}
                    className="flex items-center p-3 hover:bg-gray-50"
                  >
                    <Checkbox
                      id={`vendor-${vendor.id}`}
                      checked={formData.selectedVendors.includes(vendor.id)}
                      onCheckedChange={() => handleVendorToggle(vendor.id)}
                    />
                    <label
                      htmlFor={`vendor-${vendor.id}`}
                      className="ml-3 flex-1 cursor-pointer"
                    >
                      {vendor.name}
                    </label>
                  </div>
                ))}
              </div>
              
              {formData.selectedVendors.length > 0 && (
                <p className="text-sm text-gray-500">
                  {formData.selectedVendors.length} vendor
                  {formData.selectedVendors.length !== 1 && "s"} selected
                </p>
              )}
            </div>
          )}

          {/* Navigation buttons */}
          <div className="flex justify-between mt-8">
            {step > 1 ? (
              <Button variant="outline" onClick={prevStep}>
                Back
              </Button>
            ) : (
              <div></div>
            )}

            {step < 3 ? (
              <Button onClick={nextStep}>Continue</Button>
            ) : (
              <Button onClick={handleSubmit}>Submit Product</Button>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
