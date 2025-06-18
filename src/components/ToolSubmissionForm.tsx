
import { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Plus, X } from "lucide-react";

interface PricingPlan {
  name: string;
  price: number;
  duration: string;
  features: string;
}

const formSchema = z.object({
  name: z.string().min(2, {
    message: "Tool name must be at least 2 characters.",
  }),
  description: z.string().min(10, {
    message: "Description must be at least 10 characters.",
  }),
  websiteUrl: z.string().url({
    message: "Please enter a valid URL.",
  }),
  logoUrl: z.string().url({
    message: "Please enter a valid URL for the logo.",
  }),
  category: z.string().min(1, {
    message: "Please select a category.",
  }),
  customCategory: z.string().optional(),
  subcategory: z.string().optional(),
  customSubcategory: z.string().optional(),
  pricingType: z.enum(["free", "freemium", "paid"]),
  pricingPlans: z.array(z.object({
    name: z.string(),
    price: z.number(),
    duration: z.string(),
    features: z.string()
  })).optional(),
  features: z.string().optional(),
  useCases: z.string().optional(),
  integrations: z.string().optional(),
  supportedLanguages: z.string().optional(),
  apiAvailable: z.enum(["yes", "no", "limited"]),
  freeTrialDuration: z.string().optional(),
  targetAudience: z.string().optional(),
  tags: z.string().optional(),
  companyName: z.string().optional(),
  contactEmail: z.string().email({
    message: "Please enter a valid email address.",
  }),
  socialMedia: z.string().optional(),
  additionalInfo: z.string().optional(),
});

export const ToolSubmissionForm = () => {
  const [pricingType, setPricingType] = useState<"free" | "freemium" | "paid">("free");
  const [pricingPlans, setPricingPlans] = useState<PricingPlan[]>([
    { name: "", price: 0, duration: "month", features: "" }
  ]);
  const [customCategory, setCustomCategory] = useState("");
  const [customSubcategory, setCustomSubcategory] = useState("");
  const [showCustomCategory, setShowCustomCategory] = useState(false);
  const [showCustomSubcategory, setShowCustomSubcategory] = useState(false);

  const categories = [
    "AI for Developers",
    "Marketing Tools", 
    "Image Processing",
    "Natural Language Processing",
    "Video Processing",
    "Audio Processing",
    "Data & Analytics",
    "Security & Privacy",
    "Productivity",
    "Design & Creative",
    "AI Assistants",
    "Machine Learning",
    "Custom"
  ];

  const subcategories = {
    "AI for Developers": ["Code Generation", "Debugging", "API Tools", "Testing", "Documentation", "Code Review"],
    "Marketing Tools": ["SEO Tools", "Social Media", "Email Marketing", "Analytics", "Advertising", "Content Creation"],
    "Image Processing": ["Image Generation", "Photo Editing", "Background Removal", "Style Transfer", "Upscaling", "Face Recognition"],
    "Natural Language Processing": ["Chatbots", "Translation", "Text Analysis", "Writing Assistance", "Grammar Check", "Sentiment Analysis"],
    "Video Processing": ["Video Editing", "Video Generation", "Motion Graphics", "Subtitles", "Compression", "Live Streaming"],
    "Audio Processing": ["Music Generation", "Voice Synthesis", "Audio Editing", "Transcription", "Sound Effects", "Podcast Tools"],
    "Data & Analytics": ["Data Visualization", "Business Intelligence", "Predictive Analytics", "Data Cleaning", "Reporting"],
    "Security & Privacy": ["Fraud Detection", "Privacy Tools", "Security Audit", "Threat Intelligence", "Access Control"],
    "Productivity": ["Task Management", "Automation", "Note Taking", "Calendar", "Project Management"],
    "Design & Creative": ["Logo Design", "UI/UX Design", "Graphic Design", "3D Modeling", "Animation"],
    "AI Assistants": ["Virtual Assistants", "Customer Support", "Personal AI", "Scheduling", "Research"],
    "Machine Learning": ["Model Training", "AutoML", "Computer Vision", "Deep Learning", "MLOps"]
  };

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      description: "",
      websiteUrl: "",
      logoUrl: "",
      category: "",
      pricingType: "free",
      apiAvailable: "no",
      contactEmail: "",
      pricingPlans: []
    },
  });

  const addPricingPlan = () => {
    setPricingPlans([...pricingPlans, { name: "", price: 0, duration: "month", features: "" }]);
  };

  const removePricingPlan = (index: number) => {
    if (pricingPlans.length > 1) {
      setPricingPlans(pricingPlans.filter((_, i) => i !== index));
    }
  };

  const updatePricingPlan = (index: number, field: keyof PricingPlan, value: string | number) => {
    const updatedPlans = [...pricingPlans];
    updatedPlans[index] = { ...updatedPlans[index], [field]: value };
    setPricingPlans(updatedPlans);
  };

  const onSubmit = (values: z.infer<typeof formSchema>) => {
    const formData = {
      ...values,
      pricingPlans: (pricingType === "freemium" || pricingType === "paid") ? pricingPlans : []
    };
    console.log("Form submitted:", formData);
    // Here you would handle the form submission, e.g., sending the data to an API
  };

  return (
    <Card className="max-w-4xl mx-auto bg-white/80 backdrop-blur-sm shadow-xl border-0">
      <CardHeader>
        <CardTitle className="text-2xl font-bold">Submit Your AI Tool</CardTitle>
        <CardDescription>
          Help others discover your amazing AI tool by submitting it to our directory.
        </CardDescription>
      </CardHeader>
      
      <CardContent className="space-y-6">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            {/* Basic Information */}
            <div className="space-y-4 border rounded-lg p-4 bg-slate-50">
              <h3 className="font-semibold text-lg">Basic Information</h3>
              
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Tool Name *</FormLabel>
                    <FormControl>
                      <Input placeholder="Enter tool name" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="description"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Description *</FormLabel>
                    <FormControl>
                      <Textarea
                        placeholder="Enter a detailed description of your AI tool"
                        rows={4}
                        {...field}
                      />
                    </FormControl>
                    <FormDescription>
                      Provide a comprehensive description of what your tool does and its key benefits.
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <FormField
                  control={form.control}
                  name="websiteUrl"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Website URL *</FormLabel>
                      <FormControl>
                        <Input placeholder="https://example.com" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="logoUrl"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Logo URL *</FormLabel>
                      <FormControl>
                        <Input placeholder="https://example.com/logo.png" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            </div>

            {/* Category Selection */}
            <div className="space-y-4 border rounded-lg p-4 bg-slate-50">
              <h3 className="font-semibold text-lg">Category & Classification</h3>
              
              <FormField
                control={form.control}
                name="category"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Category *</FormLabel>
                    <Select 
                      onValueChange={(value) => {
                        field.onChange(value);
                        setShowCustomCategory(value === "Custom");
                        setShowCustomSubcategory(false);
                      }} 
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select a category" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {categories.map((category) => (
                          <SelectItem key={category} value={category}>
                            {category}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {showCustomCategory && (
                <FormField
                  control={form.control}
                  name="customCategory"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Custom Category Name</FormLabel>
                      <FormControl>
                        <Input placeholder="Enter custom category name" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              )}

              {form.watch("category") && form.watch("category") !== "Custom" && (
                <FormField
                  control={form.control}
                  name="subcategory"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Subcategory</FormLabel>
                      <Select 
                        onValueChange={(value) => {
                          field.onChange(value);
                          setShowCustomSubcategory(value === "Custom");
                        }} 
                        defaultValue={field.value}
                      >
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Select a subcategory" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          {subcategories[form.watch("category") as keyof typeof subcategories]?.map((subcategory) => (
                            <SelectItem key={subcategory} value={subcategory}>
                              {subcategory}
                            </SelectItem>
                          ))}
                          <SelectItem value="Custom">Custom</SelectItem>
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              )}

              {showCustomSubcategory && (
                <FormField
                  control={form.control}
                  name="customSubcategory"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Custom Subcategory Name</FormLabel>
                      <FormControl>
                        <Input placeholder="Enter custom subcategory name" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              )}

              <FormField
                control={form.control}
                name="tags"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Tags</FormLabel>
                    <FormControl>
                      <Input placeholder="AI, automation, productivity (comma-separated)" {...field} />
                    </FormControl>
                    <FormDescription>
                      Add relevant tags to help users discover your tool
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            {/* Pricing Information */}
            <div className="space-y-4 border rounded-lg p-4 bg-slate-50">
              <h3 className="font-semibold text-lg">Pricing Information</h3>
              
              <FormField
                control={form.control}
                name="pricingType"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Pricing Type *</FormLabel>
                    <Select 
                      onValueChange={(value) => {
                        field.onChange(value);
                        setPricingType(value as "free" | "freemium" | "paid");
                      }} 
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select pricing type" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="free">Free</SelectItem>
                        <SelectItem value="freemium">Freemium</SelectItem>
                        <SelectItem value="paid">Paid</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {(pricingType === "freemium" || pricingType === "paid") && (
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <h4 className="font-medium">Pricing Plans</h4>
                    <Button
                      type="button"
                      onClick={addPricingPlan}
                      variant="outline"
                      size="sm"
                      className="flex items-center gap-2"
                    >
                      <Plus className="h-4 w-4" />
                      Add Plan
                    </Button>
                  </div>

                  {pricingPlans.map((plan, index) => (
                    <div key={index} className="border rounded-lg p-4 bg-white space-y-4">
                      <div className="flex justify-between items-center">
                        <h5 className="font-medium">Plan {index + 1}</h5>
                        {pricingPlans.length > 1 && (
                          <Button
                            type="button"
                            onClick={() => removePricingPlan(index)}
                            variant="ghost"
                            size="sm"
                            className="text-red-600 hover:text-red-700"
                          >
                            <X className="h-4 w-4" />
                          </Button>
                        )}
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <label className="text-sm font-medium">Plan Name</label>
                          <Input
                            placeholder="e.g., Basic, Pro, Enterprise"
                            value={plan.name}
                            onChange={(e) => updatePricingPlan(index, "name", e.target.value)}
                          />
                        </div>

                        <div>
                          <label className="text-sm font-medium">Price (USD)</label>
                          <Input
                            type="number"
                            placeholder="29"
                            value={plan.price || ""}
                            onChange={(e) => updatePricingPlan(index, "price", parseFloat(e.target.value) || 0)}
                          />
                        </div>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <label className="text-sm font-medium">Duration</label>
                          <Select
                            value={plan.duration}
                            onValueChange={(value) => updatePricingPlan(index, "duration", value)}
                          >
                            <SelectTrigger>
                              <SelectValue />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="month">Monthly</SelectItem>
                              <SelectItem value="year">Yearly</SelectItem>
                              <SelectItem value="lifetime">Lifetime</SelectItem>
                              <SelectItem value="usage">Per Usage</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                      </div>

                      <div>
                        <label className="text-sm font-medium">Features Included</label>
                        <Textarea
                          placeholder="List key features for this plan"
                          rows={3}
                          value={plan.features}
                          onChange={(e) => updatePricingPlan(index, "features", e.target.value)}
                        />
                      </div>
                    </div>
                  ))}

                  <FormField
                    control={form.control}
                    name="freeTrialDuration"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Free Trial Duration</FormLabel>
                        <FormControl>
                          <Input placeholder="e.g., 14 days, 30 days, Free tier available" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
              )}
            </div>

            {/* Features & Capabilities */}
            <div className="space-y-4 border rounded-lg p-4 bg-slate-50">
              <h3 className="font-semibold text-lg">Features & Capabilities</h3>
              
              <FormField
                control={form.control}
                name="features"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Key Features</FormLabel>
                    <FormControl>
                      <Textarea
                        placeholder="List key features separated by commas or new lines"
                        rows={4}
                        {...field}
                      />
                    </FormControl>
                    <FormDescription>
                      Highlight the main features and capabilities of your tool
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="useCases"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Use Cases</FormLabel>
                    <FormControl>
                      <Textarea
                        placeholder="Describe common use cases for your tool"
                        rows={3}
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="targetAudience"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Target Audience</FormLabel>
                    <FormControl>
                      <Input placeholder="e.g., Developers, Marketers, Content Creators" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <div className="space-y-4 border rounded-lg p-4 bg-slate-50">
              <h3 className="font-semibold text-lg">Technical Details</h3>
              
              <FormField
                control={form.control}
                name="apiAvailable"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>API Available *</FormLabel>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Does your tool have an API?" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="yes">Yes</SelectItem>
                        <SelectItem value="no">No</SelectItem>
                        <SelectItem value="limited">Limited/Beta</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="integrations"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Integrations</FormLabel>
                    <FormControl>
                      <Input placeholder="e.g., Slack, Discord, Zapier, Google Workspace" {...field} />
                    </FormControl>
                    <FormDescription>
                      List platforms and services your tool integrates with
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="supportedLanguages"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Supported Languages</FormLabel>
                    <FormControl>
                      <Input placeholder="e.g., English, Spanish, French, German" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <div className="space-y-4 border rounded-lg p-4 bg-slate-50">
              <h3 className="font-semibold text-lg">Company Information</h3>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <FormField
                  control={form.control}
                  name="companyName"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Company Name</FormLabel>
                      <FormControl>
                        <Input placeholder="Your company or organization name" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="contactEmail"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Contact Email *</FormLabel>
                      <FormControl>
                        <Input type="email" placeholder="contact@yourcompany.com" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <FormField
                control={form.control}
                name="socialMedia"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Social Media</FormLabel>
                    <FormControl>
                      <Input placeholder="Twitter, LinkedIn, or other social media handles" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <div className="space-y-4 border rounded-lg p-4 bg-slate-50">
              <h3 className="font-semibold text-lg">Additional Information</h3>
              
              <FormField
                control={form.control}
                name="additionalInfo"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Additional Information</FormLabel>
                    <FormControl>
                      <Textarea
                        placeholder="Any additional information you'd like to share about your tool"
                        rows={4}
                        {...field}
                      />
                    </FormControl>
                    <FormDescription>
                      Share any other relevant details about your tool, awards, media coverage, etc.
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <div className="flex justify-end space-x-4">
              <Button type="button" variant="outline">
                Save as Draft
              </Button>
              <Button type="submit" className="bg-gradient-to-r from-[#4628dd] to-[#6e3ce7]">
                Submit Tool for Review
              </Button>
            </div>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
};
