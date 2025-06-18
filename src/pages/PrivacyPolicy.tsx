
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const PrivacyPolicy = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50">
      <div className="max-w-4xl mx-auto px-4 py-12">
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent mb-4">
            Privacy Policy
          </h1>
          <p className="text-lg text-slate-600">Last updated: December 2024</p>
        </div>

        <Card className="shadow-xl border-0 bg-white/70 backdrop-blur-sm mb-8">
          <CardHeader>
            <CardTitle className="text-2xl text-slate-800">Information We Collect</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4 text-slate-600">
            <p>We collect information you provide directly to us, such as when you create an account, submit a tool for review, or contact us for support.</p>
            <ul className="list-disc pl-6 space-y-2">
              <li>Account information (name, email address, password)</li>
              <li>Profile information (company, role, preferences)</li>
              <li>Tool submissions and reviews</li>
              <li>Communication data when you contact us</li>
            </ul>
          </CardContent>
        </Card>

        <Card className="shadow-xl border-0 bg-white/70 backdrop-blur-sm mb-8">
          <CardHeader>
            <CardTitle className="text-2xl text-slate-800">How We Use Your Information</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4 text-slate-600">
            <p>We use the information we collect to:</p>
            <ul className="list-disc pl-6 space-y-2">
              <li>Provide, maintain, and improve our services</li>
              <li>Process transactions and send related information</li>
              <li>Send technical notices and support messages</li>
              <li>Respond to comments, questions, and customer service requests</li>
              <li>Communicate about new features, updates, and promotional content</li>
            </ul>
          </CardContent>
        </Card>

        <Card className="shadow-xl border-0 bg-white/70 backdrop-blur-sm mb-8">
          <CardHeader>
            <CardTitle className="text-2xl text-slate-800">Information Sharing</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4 text-slate-600">
            <p>We do not sell, trade, or otherwise transfer your personal information to third parties except in the following circumstances:</p>
            <ul className="list-disc pl-6 space-y-2">
              <li>With your explicit consent</li>
              <li>To comply with legal obligations</li>
              <li>To protect our rights and safety</li>
              <li>With service providers who assist in our operations</li>
            </ul>
          </CardContent>
        </Card>

        <Card className="shadow-xl border-0 bg-white/70 backdrop-blur-sm mb-8">
          <CardHeader>
            <CardTitle className="text-2xl text-slate-800">Data Security</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4 text-slate-600">
            <p>We implement appropriate technical and organizational measures to protect your personal information against unauthorized access, alteration, disclosure, or destruction.</p>
          </CardContent>
        </Card>

        <Card className="shadow-xl border-0 bg-white/70 backdrop-blur-sm">
          <CardHeader>
            <CardTitle className="text-2xl text-slate-800">Contact Us</CardTitle>
          </CardHeader>
          <CardContent className="text-slate-600">
            <p>If you have any questions about this Privacy Policy, please contact us at privacy@tooliax.com</p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default PrivacyPolicy;
