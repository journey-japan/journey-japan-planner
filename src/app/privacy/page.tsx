import type { Metadata } from "next";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description:
    "Journey Japan Privacy Policy — how we collect, use, and protect your personal data under GDPR, ePrivacy, and CCPA.",
  alternates: {
    canonical: "/privacy",
  },
};

export default function PrivacyPolicyPage() {
  return (
    <>
      <Header />
      <main className="max-w-3xl mx-auto px-6 py-16">
        <h1 className="text-3xl font-bold mb-2">Privacy Policy</h1>
        <p className="text-sm text-gray-500 mb-10">
          Effective date: March 29, 2026 &middot; Last updated: March 29, 2026
        </p>

        <div className="prose prose-gray max-w-none space-y-8 text-[15px] leading-relaxed">
          {/* ── 1. Introduction ── */}
          <section>
            <h2 className="text-xl font-semibold mb-3">1. Introduction</h2>
            <p>
              Journey Japan (&quot;we,&quot; &quot;us,&quot; or &quot;our&quot;)
              operates the website{" "}
              <a
                href="https://plan.journeyjpn.com"
                className="text-accent hover:underline"
              >
                plan.journeyjpn.com
              </a>{" "}
              (the &quot;Service&quot;). This Privacy Policy explains how we
              collect, use, disclose, and safeguard your personal data when you
              visit our Service.
            </p>
            <p>
              We are committed to protecting your privacy in compliance with the
              EU General Data Protection Regulation (GDPR), the ePrivacy
              Directive, the California Consumer Privacy Act (CCPA/CPRA), and
              other applicable data protection laws.
            </p>
          </section>

          {/* ── 2. Data Controller ── */}
          <section>
            <h2 className="text-xl font-semibold mb-3">2. Data Controller</h2>
            <p>
              The data controller responsible for your personal data is Journey
              Japan. For any privacy-related inquiries, please contact us at:{" "}
              <a
                href="mailto:privacy@journeyjpn.com"
                className="text-accent hover:underline"
              >
                privacy@journeyjpn.com
              </a>
            </p>
          </section>

          {/* ── 3. Data We Collect ── */}
          <section>
            <h2 className="text-xl font-semibold mb-3">
              3. Personal Data We Collect
            </h2>

            <h3 className="text-lg font-medium mt-4 mb-2">
              3.1 Account Data (Supabase Auth)
            </h3>
            <p>
              When you create an account, we collect the following through
              Supabase Authentication:
            </p>
            <ul className="list-disc pl-6 space-y-1">
              <li>
                <strong>Email/Password sign-up:</strong> your email address and a
                securely hashed password.
              </li>
              <li>
                <strong>Google OAuth sign-in:</strong> your name, email address,
                and profile picture URL as provided by Google.
              </li>
              <li>
                <strong>Magic Link sign-in:</strong> your email address.
              </li>
            </ul>
            <p>
              Your authentication data is stored in Supabase (hosted on AWS
              infrastructure in the ap-northeast-1 region). Passwords are hashed
              using bcrypt and are never stored in plain text.
            </p>

            <h3 className="text-lg font-medium mt-4 mb-2">
              3.2 Usage Data (Google Analytics)
            </h3>
            <p>
              We use Google Analytics 4 (measurement ID: G-5HXRQZT8LF) to
              understand how visitors interact with our Service. Google Analytics
              collects:
            </p>
            <ul className="list-disc pl-6 space-y-1">
              <li>Pages visited and time spent on each page</li>
              <li>Referral source (how you arrived at our site)</li>
              <li>Device type, browser, and operating system</li>
              <li>Approximate geographic location (city-level, derived from IP)</li>
              <li>Interaction events (clicks, scrolls, searches)</li>
            </ul>
            <p>
              Google Analytics uses cookies to distinguish unique users. IP
              addresses are anonymized before storage. For more information, see{" "}
              <a
                href="https://policies.google.com/privacy"
                className="text-accent hover:underline"
                target="_blank"
                rel="noopener noreferrer"
              >
                Google&apos;s Privacy Policy
              </a>
              .
            </p>

            <h3 className="text-lg font-medium mt-4 mb-2">
              3.3 User-Generated Content
            </h3>
            <p>
              When you use our trip planner, we store the itineraries you create,
              including selected destinations, schedules, and notes. This data is
              associated with your account and protected by Row Level Security
              (RLS) policies so only you can access it.
            </p>
          </section>

          {/* ── 4. Cookies ── */}
          <section>
            <h2 className="text-xl font-semibold mb-3">
              4. Cookies and Similar Technologies
            </h2>
            <p>We use the following categories of cookies:</p>

            <div className="overflow-x-auto">
              <table className="min-w-full border border-gray-200 text-sm mt-3">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-4 py-2 text-left font-medium border-b">
                      Category
                    </th>
                    <th className="px-4 py-2 text-left font-medium border-b">
                      Cookie
                    </th>
                    <th className="px-4 py-2 text-left font-medium border-b">
                      Purpose
                    </th>
                    <th className="px-4 py-2 text-left font-medium border-b">
                      Duration
                    </th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="border-b">
                    <td className="px-4 py-2 font-medium">Essential</td>
                    <td className="px-4 py-2">
                      <code className="text-xs">sb-*-auth-token</code>
                    </td>
                    <td className="px-4 py-2">
                      Supabase authentication session
                    </td>
                    <td className="px-4 py-2">Session / 1 year</td>
                  </tr>
                  <tr className="border-b">
                    <td className="px-4 py-2 font-medium">Essential</td>
                    <td className="px-4 py-2">
                      <code className="text-xs">jj-cookie-consent</code>
                    </td>
                    <td className="px-4 py-2">
                      Stores your cookie consent preference
                    </td>
                    <td className="px-4 py-2">Persistent (localStorage)</td>
                  </tr>
                  <tr className="border-b">
                    <td className="px-4 py-2 font-medium">Analytics</td>
                    <td className="px-4 py-2">
                      <code className="text-xs">_ga, _ga_*</code>
                    </td>
                    <td className="px-4 py-2">
                      Google Analytics — distinguish unique users and sessions
                    </td>
                    <td className="px-4 py-2">Up to 2 years</td>
                  </tr>
                </tbody>
              </table>
            </div>

            <p className="mt-3">
              When you first visit our Service, a cookie consent banner is
              displayed, allowing you to choose which categories of cookies to
              accept. You can select from the following categories:
            </p>
            <ul className="list-disc pl-6 space-y-1 mt-2">
              <li>
                <strong>Necessary:</strong> Required for the site to function
                properly. These cannot be disabled.
              </li>
              <li>
                <strong>Analytics:</strong> Help us understand how visitors use
                our site. Only activated if you give explicit consent.
              </li>
              <li>
                <strong>Marketing:</strong> Used to deliver relevant
                advertisements and measure campaign effectiveness. Only
                activated with your explicit consent.
              </li>
            </ul>
            <p className="mt-2">
              You may change your preferences at any time by clearing your
              browser&apos;s local storage and refreshing the page, which will
              re-display the consent banner. When you withdraw consent for a
              category, the associated cookies are deleted.
            </p>
          </section>

          {/* ── 5. Legal Basis ── */}
          <section>
            <h2 className="text-xl font-semibold mb-3">
              5. Legal Basis for Processing (GDPR)
            </h2>
            <p>We process your personal data on the following legal bases:</p>
            <ul className="list-disc pl-6 space-y-1">
              <li>
                <strong>Consent (Art. 6(1)(a) GDPR):</strong> Analytics cookies
                and marketing communications are only processed after you give
                explicit consent.
              </li>
              <li>
                <strong>Contract performance (Art. 6(1)(b) GDPR):</strong>{" "}
                Account creation and itinerary storage are necessary to provide
                the Service you requested.
              </li>
              <li>
                <strong>Legitimate interest (Art. 6(1)(f) GDPR):</strong>{" "}
                Essential cookies and basic security measures to protect the
                Service and its users.
              </li>
            </ul>
          </section>

          {/* ── 6. Data Sharing ── */}
          <section>
            <h2 className="text-xl font-semibold mb-3">
              6. Data Sharing and Third-Party Processors
            </h2>
            <p>
              We do not sell your personal data. We share data only with the
              following service providers who act as data processors on our
              behalf:
            </p>
            <ul className="list-disc pl-6 space-y-1">
              <li>
                <strong>Supabase Inc.</strong> — database hosting,
                authentication, and file storage (AWS ap-northeast-1).
              </li>
              <li>
                <strong>Vercel Inc.</strong> — website hosting and edge network
                delivery.
              </li>
              <li>
                <strong>Google LLC</strong> — Google Analytics for usage
                statistics; Google Maps for map display; Google OAuth for
                sign-in.
              </li>
              <li>
                <strong>Unsplash Inc.</strong> — stock photography used on the
                site (no user data is shared with Unsplash).
              </li>
            </ul>
            <p>
              Each processor is bound by a Data Processing Agreement (DPA) or
              equivalent contractual safeguards. Where data is transferred
              outside the EEA, we rely on Standard Contractual Clauses (SCCs) or
              adequacy decisions.
            </p>
          </section>

          {/* ── 7. Data Retention ── */}
          <section>
            <h2 className="text-xl font-semibold mb-3">7. Data Retention</h2>
            <ul className="list-disc pl-6 space-y-1">
              <li>
                <strong>Account data:</strong> retained for as long as your
                account is active. Upon deletion, all personal data is removed
                within 30 days.
              </li>
              <li>
                <strong>Itinerary data:</strong> retained for as long as your
                account is active; deleted when you delete your account.
              </li>
              <li>
                <strong>Analytics data:</strong> Google Analytics data is
                retained for 14 months, after which it is automatically deleted.
              </li>
              <li>
                <strong>Server logs:</strong> retained for up to 30 days for
                security and debugging purposes.
              </li>
            </ul>
          </section>

          {/* ── 8. Your Rights ── */}
          <section>
            <h2 className="text-xl font-semibold mb-3">
              8. Your Rights
            </h2>

            <h3 className="text-lg font-medium mt-4 mb-2">
              8.1 Rights under GDPR (EU/EEA Residents)
            </h3>
            <p>Under the GDPR, you have the right to:</p>
            <ul className="list-disc pl-6 space-y-1">
              <li>
                <strong>Access</strong> — request a copy of the personal data we
                hold about you.
              </li>
              <li>
                <strong>Rectification</strong> — request correction of inaccurate
                data.
              </li>
              <li>
                <strong>Erasure</strong> — request deletion of your personal data
                (&quot;right to be forgotten&quot;).
              </li>
              <li>
                <strong>Restriction</strong> — request restriction of processing
                in certain circumstances.
              </li>
              <li>
                <strong>Data portability</strong> — receive your data in a
                structured, machine-readable format.
              </li>
              <li>
                <strong>Objection</strong> — object to processing based on
                legitimate interest.
              </li>
              <li>
                <strong>Withdraw consent</strong> — withdraw consent at any time
                without affecting the lawfulness of prior processing.
              </li>
            </ul>
            <p>
              You also have the right to lodge a complaint with your local data
              protection authority (supervisory authority).
            </p>

            <h3 className="text-lg font-medium mt-4 mb-2">
              8.2 Rights under CCPA/CPRA (California Residents)
            </h3>
            <p>
              If you are a California resident, you have the right to:
            </p>
            <ul className="list-disc pl-6 space-y-1">
              <li>
                Know what personal information we collect and how it is used.
              </li>
              <li>Request deletion of your personal information.</li>
              <li>
                Opt out of the &quot;sale&quot; or &quot;sharing&quot; of
                personal information. <strong>We do not sell or share your
                personal information.</strong>
              </li>
              <li>Non-discrimination for exercising your privacy rights.</li>
            </ul>
          </section>

          {/* ── 9. How to Exercise Your Rights ── */}
          <section>
            <h2 className="text-xl font-semibold mb-3">
              9. How to Exercise Your Rights
            </h2>
            <p>
              To exercise any of the rights described above, please email us at{" "}
              <a
                href="mailto:privacy@journeyjpn.com"
                className="text-accent hover:underline"
              >
                privacy@journeyjpn.com
              </a>
              . We will respond within 30 days (or within the timeframe required
              by applicable law). We may ask you to verify your identity before
              processing your request.
            </p>
          </section>

          {/* ── 10. Data Security ── */}
          <section>
            <h2 className="text-xl font-semibold mb-3">10. Data Security</h2>
            <p>
              We implement appropriate technical and organizational measures to
              protect your data, including:
            </p>
            <ul className="list-disc pl-6 space-y-1">
              <li>HTTPS/TLS encryption for all data in transit.</li>
              <li>
                HTTP security headers (Content Security Policy, HSTS,
                X-Frame-Options, X-Content-Type-Options).
              </li>
              <li>
                Row Level Security (RLS) in our database ensuring users can only
                access their own data.
              </li>
              <li>
                Bcrypt password hashing for email/password authentication.
              </li>
              <li>
                Middleware-level route protection for administrative areas.
              </li>
            </ul>
          </section>

          {/* ── 11. Children's Privacy ── */}
          <section>
            <h2 className="text-xl font-semibold mb-3">
              11. Children&apos;s Privacy
            </h2>
            <p>
              Our Service is not directed to individuals under the age of 16. We
              do not knowingly collect personal data from children. If you
              believe we have inadvertently collected data from a child, please
              contact us immediately so we can delete it.
            </p>
          </section>

          {/* ── 12. International Transfers ── */}
          <section>
            <h2 className="text-xl font-semibold mb-3">
              12. International Data Transfers
            </h2>
            <p>
              Your data may be transferred to and processed in countries outside
              of your country of residence, including the United States and
              Japan. When we transfer data outside the EEA, we ensure adequate
              safeguards are in place, such as Standard Contractual Clauses
              (SCCs) approved by the European Commission.
            </p>
          </section>

          {/* ── 13. Changes ── */}
          <section>
            <h2 className="text-xl font-semibold mb-3">
              13. Changes to This Privacy Policy
            </h2>
            <p>
              We may update this Privacy Policy from time to time. When we make
              material changes, we will notify you by posting a prominent notice
              on our Service or sending you an email. The &quot;Last
              updated&quot; date at the top of this page indicates when this
              policy was last revised.
            </p>
          </section>

          {/* ── 14. Contact ── */}
          <section>
            <h2 className="text-xl font-semibold mb-3">14. Contact Us</h2>
            <p>
              If you have any questions or concerns about this Privacy Policy or
              our data practices, please contact us at:
            </p>
            <p className="mt-2">
              <strong>Journey Japan</strong>
              <br />
              Email:{" "}
              <a
                href="mailto:privacy@journeyjpn.com"
                className="text-accent hover:underline"
              >
                privacy@journeyjpn.com
              </a>
            </p>
          </section>
        </div>
      </main>
      <Footer />
    </>
  );
}
