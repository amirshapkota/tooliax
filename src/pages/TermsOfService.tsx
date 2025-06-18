
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const TermsOfService = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50">
      <div className="max-w-4xl mx-auto px-4 py-12">
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent mb-4">
            Terms of Service
          </h1>
          <p className="text-lg text-slate-600">Last updated: December 2024</p>
        </div>

        <Card className="shadow-xl border-0 bg-white/70 backdrop-blur-sm mb-8">
          <CardHeader>
            <CardTitle className="text-2xl text-slate-800">Acceptance of Terms</CardTitle>
          </CardHeader>
          <CardContent className="text-slate-600">
            <p>By accessing and using Tooliax, you accept and agree to be bound by the terms and provision of this agreement.</p>
          </CardContent>
        </Card>

        <Card className="shadow-xl border-0 bg-white/70 backdrop-blur-sm mb-8">
          <CardHeader>
            <CardTitle className="text-2xl text-slate-800">Use License</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4 text-slate-600">
            <p>Permission is granted to temporarily access Tooliax for personal, non-commercial transitory viewing only. This is the grant of a license, not a transfer of title, and under this license you may not:</p>
            <ul className="list-disc pl-6 space-y-2">
              <li>Modify or copy the materials</li>
              <li>Use the materials for commercial purposes or for public display</li>
              <li>Attempt to reverse engineer any software contained on the website</li>
              <li>Remove any copyright or proprietary notations from the materials</li>
            </ul>
          </CardContent>
        </Card>

        <Card className="shadow-xl border-0 bg-white/70 backdrop-blur-sm mb-8">
          <CardHeader>
            <CardTitle className="text-2xl text-slate-800">User Accounts</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4 text-slate-600">
            <p>When you create an account with us, you must provide information that is accurate, complete, and current at all times. You are responsible for safeguarding the password and for all activities under your account.</p>
          </CardContent>
        </Card>

        <Card className="shadow-xl border-0 bg-white/70 backdrop-blur-sm mb-8">
          <CardHeader>
            <CardTitle className="text-2xl text-slate-800">Tool Submissions</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4 text-slate-600">
            <p>By submitting a tool for listing on Tooliax, you warrant that:</p>
            <ul className="list-disc pl-6 space-y-2">
              <li>You own or have the right to submit the tool</li>
              <li>The information provided is accurate and complete</li>
              <li>The tool complies with all applicable laws and regulations</li>
              <li>You grant us the right to display and promote your tool on our platform</li>
            </ul>
          </CardContent>
        </Card>

        <Card className="shadow-xl border-0 bg-white/70 backdrop-blur-sm">
          <CardHeader>
            <CardTitle className="text-2xl text-slate-800">Contact Information</CardTitle>
          </CardHeader>
          <CardContent className="text-slate-600">
            <p>Questions about the Terms of Service should be sent to us at legal@tooliax.com</p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default TermsOfService;
