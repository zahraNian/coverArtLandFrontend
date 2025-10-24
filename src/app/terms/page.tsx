import Link from "next/link";

export default function TermsPage() {
    return (
        <main className="pb-20">
            <div className="max-w-frame mx-auto px-4 xl:px-0">
                <hr className="h-[1px] border-t-black/10 mb-5 sm:mb-6" />
                <header className="mb-6 sm:mb-8">
                    <h1 className="text-2xl md:text-[32px] font-bold">Terms of Service</h1>
                    <p className="text-black/60 mt-2 max-w-2xl">Please read these terms carefully before using CoverArtLand.</p>
                    <p className="text-black/60 mt-2 max-w-2xl">Last updated: October 24, 2025</p>
                </header>

                <section className="rounded-xl border border-black/10 bg-white p-5 sm:p-6 lg:p-8">
                    <article className="prose prose-slate max-w-none whitespace-pre-line">
                        <p><strong>Terms of Service – CoverArtLand</strong></p>
                        Welcome to CoverArtLand (“we,” “our,” “us”). By accessing or using our website <Link className="underline text-blue-800" href='/'>coverartland.com</Link>&nbsp;
                        (the “Site”) and our related services, you agree to be bound by these Terms of Service (“Terms”). Please read them carefully before using our website. If you do not agree to these Terms, you may not use our services.
                        Coverartland is an online marketplace that sells and delivers custom and pre-made music cover artworks (“Products”). By using our site, you agree to comply with all applicable laws and these Terms.
                        You must be at least 18 years old or have the legal consent of a parent or guardian to use this website. By using our services, you represent that all information you provide is accurate and complete.
                        To make a purchase, you may be required to create an account. You are responsible for maintaining the confidentiality of your login information and all activity that occurs under your account. We are not liable for any loss or damage caused by unauthorized account access.
                        All prices are displayed in USD and are subject to change without notice. Payment must be completed before any product is delivered. We accept payments through trusted third-party gateways such as Mastercard and Paypal. Coverartland does not store or have access to your full payment details. We reserve the right to refuse or cancel any order at our discretion, including in cases of suspected fraud or unauthorized transactions.
                        All artworks purchased on Coverartland are digital products and will be delivered electronically via email or direct download after payment confirmation. No physical items will be shipped. Once the product has been downloaded or delivered, no refunds or cancellations are possible due to the digital nature of our products.
                        When you purchase an artwork, you are granted a non-exclusive, non-transferable license to use the artwork for your personal or commercial music projects. You may use the artwork for album covers, streaming platforms, or personal branding. You may not resell, redistribute, or claim the artwork as your own creation, nor use it in a way that violates copyright or trademark laws. Exclusive licenses may be available for some artworks; please contact us if you wish to purchase exclusive rights.
                        Due to the digital nature of our products, all sales are final. We do not issue refunds once a digital file has been downloaded or delivered unless the product is proven defective or not as described.
                        All content on this website, including images, logos, graphics, and text, is the property of Coverartland and is protected by copyright and intellectual property laws. You may not copy, modify, or reproduce any part of the website without written permission.
                        You agree not to use our website or products for any unlawful purpose, distributing harmful software, violating the rights of others, or uploading offensive or illegal content. Violation of these terms may result in immediate suspension or termination of your access to the site.
                        Coverartland shall not be held responsible for any direct, indirect, incidental, or consequential damages arising from the use or inability to use our services or products. We do not guarantee uninterrupted or error-free service, and we are not liable for technical issues beyond our control.
                        We may update these Terms of Service at any time. Any changes will be posted on this page with a new “Last Updated” date. Continued use of the website after changes constitutes your acceptance of the updated Terms.
                        These Terms are governed by and construed in accordance with the laws of your country or jurisdiction. Any disputes shall be handled in the courts of that jurisdiction.
                        If you have any questions about these Terms of Service, please contact us at &nbsp;
                        <a className="underline text-blue-800" href="mailto:support@coverartland.com">
                            support@coverartland.com
                        </a>.
                    </article>
                </section>
            </div>
        </main>
    )
}