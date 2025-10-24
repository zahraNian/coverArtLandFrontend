import Link from "next/link";

export default function PrivacyPage() {
    return (
        <main className="pb-20">
            <div className="max-w-frame mx-auto px-4 xl:px-0">
                <hr className="h-[1px] border-t-black/10 mb-5 sm:mb-6" />
                <header className="mb-6 sm:mb-8">
                    <h1 className="text-2xl md:text-[32px] font-bold">Privacy Policy</h1>
                    <p className="text-black/60 mt-2 max-w-2xl">Privacy Policy – CoverArtLand</p>
                    <p className="text-black/60">Last updated: October 24, 2025</p>
                </header>

                <section className="rounded-xl border border-black/10 bg-white p-5 sm:p-6 lg:p-8 space-y-6">
                    <article className="prose prose-slate max-w-none">
                        <p>At CoverArtLand (“we,” “our,” “us”) your privacy is our top priority. This Privacy Policy describes how we collect, use, and protect your personal information when you visit our website <Link className="underline text-blue-800" href='/'>coverartland.com</Link>, purchase our products, or interact with our services.</p>
                        <p>We collect several types of information to provide and improve our services.</p>

                        <h2 className="text-lg font-semibold">We may collect personal information such as:</h2>
                        <ul className="list-disc pl-6">
                            <li>Full name</li>
                            <li>Your album, track or EP</li>
                            <li>Email address</li>
                            <li>Payment information (Processed securely via third-party payment gateways)</li>
                        </ul>

                        <h2 className="text-lg font-semibold">We may also collect non-personal information automatically, including:</h2>
                        <ul className="list-disc pl-6">
                            <li>Browser type and version</li>
                            <li>Device information</li>
                            <li>IP address</li>
                            <li>Pages visited and time spent on our website</li>
                        </ul>
                        <p>This helps us improve user experience and website performance.</p>

                        <h2 className="text-lg font-semibold">We use your information to:</h2>
                        <ul className="list-disc pl-6">
                            <li>Process and fulfill your orders</li>
                            <li>Communicate with you regarding purchases, updates, or support</li>
                            <li>Personalize your shopping experience</li>
                            <li>Improve our website and product offerings</li>
                            <li>Send promotional emails (only if you consent)</li>
                        </ul>
                        <p>We do not sell or rent your personal information to third parties.</p>

                        <h2 className="text-lg font-semibold">Payments</h2>
                        <p>All payments are securely processed through trusted third-party payment providers such as Mastercard. We do not store your full payment card details on our servers.</p>

                        <h2 className="text-lg font-semibold">Cookies</h2>
                        <p>We use cookies to:</p>
                        <ul className="list-disc pl-6">
                            <li>Remember your preferences and shopping cart</li>
                            <li>Analyze site traffic and performance</li>
                            <li>Improve our marketing efforts</li>
                        </ul>
                        <p>You can manage or disable cookies through your browser settings.</p>

                        <h2 className="text-lg font-semibold">Data Security</h2>
                        <p>We use industry-standard encryption (SSL) and secure servers to protect your personal data from unauthorized access, alteration, or disclosure.</p>

                        <h2 className="text-lg font-semibold">Third-Party Services</h2>
                        <p>We may use third-party tools (such as analytics, payment gateways, or email marketing platforms). These services have their own privacy policies. We recommend reviewing their policies to understand how your information is handled.</p>

                        <h2 className="text-lg font-semibold">Your rights</h2>
                        <p>Depending on your location, you may have the right to:</p>
                        <ul className="list-disc pl-6">
                            <li>Access and request a copy of your personal data</li>
                            <li>Correct or delete your data</li>
                            <li>Withdraw consent to data processing</li>
                            <li>Object to data processing for marketing purposes</li>
                        </ul>
                        <p>To exercise these rights, please contact us at &nbsp;<a className="underline text-blue-800" href="mailto:support@coverartland.com">
                            support@coverartland.com
                        </a></p>

                        <h2 className="text-lg font-semibold">Data Retention</h2>
                        <p>We retain your information only as long as necessary for the purposes outlined in this policy.</p>

                        <h2 className="text-lg font-semibold">Children</h2>
                        <p>Our website is not intended for children under 13. We do not knowingly collect personal information from minors. If you believe a child has provided us with personal data, please contact us immediately.</p>

                        <h2 className="text-lg font-semibold">International Transfers</h2>
                        <p>If you are accessing our site from outside our hosting country, please note that your data may be transferred to and processed in other countries that may have different data protection laws.</p>

                        <h2 className="text-lg font-semibold">Changes</h2>
                        <p>We may update this Privacy Policy from time to time. Any changes will be posted on this page with a new “Last Updated” date. Please review it periodically.</p>

                        <h2 className="text-lg font-semibold">Contact</h2>
                        <p>If you have any questions or concerns about this Privacy Policy, please contact us at &nbsp;<a className="underline text-blue-800" href="mailto:support@coverartland.com">
                            support@coverartland.com
                        </a>
                        </p>
                    </article>
                </section>
            </div>
        </main>
    )
}