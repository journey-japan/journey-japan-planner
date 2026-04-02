import type { Metadata } from "next";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Terms of Service",
  description:
    "Journey Japan Terms of Service — the rules and conditions for using our travel planning service.",
  alternates: {
    canonical: "/terms",
  },
};

export default function TermsOfServicePage() {
  return (
    <>
      <Header />
      <main className="max-w-3xl mx-auto px-6 py-16">
        <h1 className="text-3xl font-bold mb-2">Terms of Service</h1>
        <p className="text-sm text-gray-500 mb-10">
          Effective date: March 29, 2026 &middot; Last updated: March 29, 2026
        </p>

        <div className="prose prose-gray max-w-none space-y-8 text-[15px] leading-relaxed">
          {/* ── 1. Acceptance of Terms ── */}
          <section>
            <h2 className="text-xl font-semibold mb-3">
              1. Acceptance of Terms
            </h2>
            <p>
              By accessing or using the website{" "}
              <a
                href="https://plan.journeyjpn.com"
                className="text-accent hover:underline"
              >
                plan.journeyjpn.com
              </a>{" "}
              (the &quot;Service&quot;), operated by Journey Japan (&quot;we,&quot;
              &quot;us,&quot; or &quot;our&quot;), you agree to be bound by these
              Terms of Service (&quot;Terms&quot;). If you do not agree to these
              Terms, please do not use the Service.
            </p>
            <p>
              We may update these Terms from time to time. Continued use of the
              Service after changes constitutes acceptance of the revised Terms.
              We will indicate the date of the most recent revision at the top of
              this page.
            </p>
          </section>

          {/* ── 2. Description of Service ── */}
          <section>
            <h2 className="text-xl font-semibold mb-3">
              2. Description of Service
            </h2>
            <p>
              Journey Japan provides an online travel planning platform that
              helps visitors plan trips to Japan. The Service includes
              destination guides, curated itineraries, a trip planner tool, and
              blog content about traveling in Japan.
            </p>
            <p>
              The Service is provided on an &quot;as is&quot; and &quot;as
              available&quot; basis. We reserve the right to modify, suspend, or
              discontinue any part of the Service at any time without prior
              notice.
            </p>
          </section>

          {/* ── 3. Account Registration ── */}
          <section>
            <h2 className="text-xl font-semibold mb-3">
              3. Account Registration
            </h2>
            <p>
              Certain features of the Service, such as saving itineraries,
              require you to create an account. When you register, you agree to:
            </p>
            <ul className="list-disc pl-6 space-y-1">
              <li>
                Provide accurate, current, and complete information during
                registration.
              </li>
              <li>
                Keep your account credentials secure and not share them with
                third parties.
              </li>
              <li>
                Notify us immediately if you suspect unauthorized access to your
                account.
              </li>
              <li>
                Accept responsibility for all activities that occur under your
                account.
              </li>
            </ul>
            <p>
              You may register using email/password, Google OAuth, or a magic
              link. We reserve the right to suspend or terminate accounts that
              violate these Terms.
            </p>
          </section>

          {/* ── 4. User Conduct ── */}
          <section>
            <h2 className="text-xl font-semibold mb-3">4. User Conduct</h2>
            <p>You agree not to use the Service to:</p>
            <ul className="list-disc pl-6 space-y-1">
              <li>
                Violate any applicable law, regulation, or third-party rights.
              </li>
              <li>
                Upload or transmit any content that is unlawful, harmful,
                threatening, abusive, defamatory, or otherwise objectionable.
              </li>
              <li>
                Attempt to gain unauthorized access to any part of the Service,
                other accounts, or related systems or networks.
              </li>
              <li>
                Use automated tools (bots, scrapers, crawlers) to access or
                collect data from the Service without our written permission.
              </li>
              <li>
                Interfere with or disrupt the integrity or performance of the
                Service.
              </li>
              <li>
                Impersonate any person or entity, or falsely represent your
                affiliation with any person or entity.
              </li>
            </ul>
          </section>

          {/* ── 5. Intellectual Property ── */}
          <section>
            <h2 className="text-xl font-semibold mb-3">
              5. Intellectual Property
            </h2>
            <p>
              All content on the Service, including text, graphics, logos,
              images, and software, is the property of Journey Japan or its
              licensors and is protected by intellectual property laws. You may
              not reproduce, distribute, modify, or create derivative works from
              any content on the Service without our prior written consent.
            </p>
            <p>
              Some photographs displayed on the Service are sourced from{" "}
              <a
                href="https://unsplash.com"
                className="text-accent hover:underline"
                target="_blank"
                rel="noopener noreferrer"
              >
                Unsplash
              </a>{" "}
              and are used under the Unsplash License. Attribution is provided
              where required.
            </p>
          </section>

          {/* ── 6. User-Generated Content ── */}
          <section>
            <h2 className="text-xl font-semibold mb-3">
              6. User-Generated Content
            </h2>
            <p>
              When you create itineraries or submit other content through the
              Service (&quot;User Content&quot;), you retain ownership of your
              User Content. By submitting User Content, you grant us a
              non-exclusive, worldwide, royalty-free license to use, display,
              and store your User Content solely for the purpose of providing
              and improving the Service.
            </p>
            <p>
              You represent and warrant that you have all necessary rights to
              submit User Content and that your User Content does not infringe
              any third-party rights.
            </p>
          </section>

          {/* ── 7. Third-Party Links and Services ── */}
          <section>
            <h2 className="text-xl font-semibold mb-3">
              7. Third-Party Links and Services
            </h2>
            <p>
              The Service may contain links to third-party websites, including
              booking platforms, tour operators, and transportation providers.
              These links are provided for your convenience only. We do not
              control, endorse, or assume responsibility for the content,
              privacy policies, or practices of any third-party websites.
            </p>
            <p>
              Any transactions or interactions you have with third-party
              services are solely between you and the third party. We are not
              liable for any loss or damage arising from your use of
              third-party services.
            </p>
          </section>

          {/* ── 8. Travel Information Disclaimer ── */}
          <section>
            <h2 className="text-xl font-semibold mb-3">
              8. Travel Information Disclaimer
            </h2>
            <p>
              The travel information provided on the Service, including
              destination guides, opening hours, admission fees, and
              transportation details, is for general informational purposes
              only. While we strive to keep information accurate and up to date,
              we do not guarantee the completeness, reliability, or accuracy of
              any travel information.
            </p>
            <p>
              Travel conditions, prices, schedules, and availability may change
              without notice. You are responsible for verifying all travel
              information directly with the relevant service providers, venues,
              and official sources before making travel arrangements.
            </p>
          </section>

          {/* ── 9. Limitation of Liability ── */}
          <section>
            <h2 className="text-xl font-semibold mb-3">
              9. Limitation of Liability
            </h2>
            <p>
              To the maximum extent permitted by applicable law, Journey Japan
              and its officers, directors, employees, and agents shall not be
              liable for any indirect, incidental, special, consequential, or
              punitive damages, including but not limited to loss of profits,
              data, or goodwill, arising out of or in connection with your use
              of or inability to use the Service.
            </p>
            <p>
              Our total liability for any claim arising from or relating to
              these Terms or the Service shall not exceed the amount you paid us
              (if any) in the twelve (12) months preceding the claim.
            </p>
            <p>
              Nothing in these Terms shall exclude or limit our liability for
              death or personal injury caused by our negligence, fraud, or any
              other liability that cannot be excluded or limited by applicable
              law.
            </p>
          </section>

          {/* ── 10. Disclaimer of Warranties ── */}
          <section>
            <h2 className="text-xl font-semibold mb-3">
              10. Disclaimer of Warranties
            </h2>
            <p>
              The Service is provided &quot;as is&quot; and &quot;as
              available&quot; without warranties of any kind, whether express or
              implied, including but not limited to implied warranties of
              merchantability, fitness for a particular purpose, and
              non-infringement.
            </p>
            <p>
              We do not warrant that the Service will be uninterrupted,
              error-free, or free of harmful components. Your use of the
              Service is at your own risk.
            </p>
          </section>

          {/* ── 11. Indemnification ── */}
          <section>
            <h2 className="text-xl font-semibold mb-3">11. Indemnification</h2>
            <p>
              You agree to indemnify, defend, and hold harmless Journey Japan
              and its officers, directors, employees, and agents from and
              against any claims, liabilities, damages, losses, and expenses
              (including reasonable legal fees) arising out of or in connection
              with:
            </p>
            <ul className="list-disc pl-6 space-y-1">
              <li>Your use of the Service.</li>
              <li>Your violation of these Terms.</li>
              <li>
                Your violation of any rights of a third party, including
                intellectual property rights.
              </li>
              <li>
                Any User Content you submit through the Service.
              </li>
            </ul>
          </section>

          {/* ── 12. Termination ── */}
          <section>
            <h2 className="text-xl font-semibold mb-3">12. Termination</h2>
            <p>
              We may terminate or suspend your access to the Service at any
              time, with or without cause, and with or without notice. Upon
              termination, your right to use the Service ceases immediately.
            </p>
            <p>
              You may terminate your account at any time by contacting us at{" "}
              <a
                href="mailto:support@journeyjpn.com"
                className="text-accent hover:underline"
              >
                support@journeyjpn.com
              </a>
              . Upon account deletion, your personal data will be handled in
              accordance with our{" "}
              <Link href="/privacy" className="text-accent hover:underline">
                Privacy Policy
              </Link>
              .
            </p>
            <p>
              Sections 5, 6, 9, 10, 11, 13, and 14 shall survive termination
              of these Terms.
            </p>
          </section>

          {/* ── 13. Governing Law ── */}
          <section>
            <h2 className="text-xl font-semibold mb-3">
              13. Governing Law and Dispute Resolution
            </h2>
            <p>
              These Terms shall be governed by and construed in accordance with
              the laws of Japan, without regard to its conflict of law
              provisions.
            </p>
            <p>
              Any dispute arising from or relating to these Terms or the
              Service shall first be attempted to be resolved through good-faith
              negotiation. If the dispute cannot be resolved through
              negotiation, it shall be submitted to the exclusive jurisdiction
              of the courts of Tokyo, Japan.
            </p>
            <p>
              If you are a consumer in the European Union, nothing in this
              section affects your right to rely on mandatory provisions of the
              law of your country of residence or to bring proceedings in the
              courts of your country of residence.
            </p>
          </section>

          {/* ── 14. General Provisions ── */}
          <section>
            <h2 className="text-xl font-semibold mb-3">
              14. General Provisions
            </h2>
            <ul className="list-disc pl-6 space-y-1">
              <li>
                <strong>Severability:</strong> If any provision of these Terms is
                found to be invalid or unenforceable, the remaining provisions
                shall continue in full force and effect.
              </li>
              <li>
                <strong>Waiver:</strong> Our failure to enforce any right or
                provision of these Terms shall not constitute a waiver of that
                right or provision.
              </li>
              <li>
                <strong>Entire Agreement:</strong> These Terms, together with our{" "}
                <Link href="/privacy" className="text-accent hover:underline">
                  Privacy Policy
                </Link>
                , constitute the entire agreement between you and Journey Japan
                regarding the use of the Service.
              </li>
              <li>
                <strong>Assignment:</strong> You may not assign or transfer these
                Terms without our prior written consent. We may assign our rights
                and obligations under these Terms without restriction.
              </li>
            </ul>
          </section>

          {/* ── 15. Contact Us ── */}
          <section>
            <h2 className="text-xl font-semibold mb-3">15. Contact Us</h2>
            <p>
              If you have any questions about these Terms of Service, please
              contact us at:
            </p>
            <p className="mt-2">
              <strong>Journey Japan</strong>
              <br />
              Email:{" "}
              <a
                href="mailto:support@journeyjpn.com"
                className="text-accent hover:underline"
              >
                support@journeyjpn.com
              </a>
            </p>
          </section>
        </div>
      </main>
      <Footer />
    </>
  );
}
