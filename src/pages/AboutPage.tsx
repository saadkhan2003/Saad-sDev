import { Github, Twitter, Linkedin, Mail } from 'lucide-react';
import { author } from '../data/mockData';
import { NewsletterSignup } from '../components/newsletter-signup';

export function AboutPage() {
  return (
    <div className="min-h-screen bg-white dark:bg-gray-950">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center mb-12">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-6">
            About Saad.dev
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-300">
            Your source for insightful tech news and analysis
          </p>
        </div>

        {/* Author section */}
        <div className="bg-gray-50 dark:bg-gray-900 rounded-xl p-8 mb-12">
          <div className="flex flex-col md:flex-row items-center md:items-start gap-8">
            <div className="w-32 h-32 rounded-full overflow-hidden flex-shrink-0">
              <img
                src={author.profileImage}
                alt={author.name}
                className="w-full h-full object-cover"
              />
            </div>
            <div className="flex-1 text-center md:text-left">
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
                {author.name}
              </h2>
              <p className="text-gray-600 dark:text-gray-300 mb-6">
                {author.bio}
              </p>
              <div className="flex justify-center md:justify-start space-x-6">
                {author.socialLinks?.twitter && (
                  <a
                    href={author.socialLinks.twitter}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white"
                    aria-label="Twitter"
                  >
                    <Twitter className="h-5 w-5" />
                  </a>
                )}
                {author.socialLinks?.github && (
                  <a
                    href={author.socialLinks.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white"
                    aria-label="GitHub"
                  >
                    <Github className="h-5 w-5" />
                  </a>
                )}
                {author.socialLinks?.linkedin && (
                  <a
                    href={author.socialLinks.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white"
                    aria-label="LinkedIn"
                  >
                    <Linkedin className="h-5 w-5" />
                  </a>
                )}
                {author.email && (
                  <a
                    href={`mailto:${author.email}`}
                    className="text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white"
                    aria-label="Email"
                  >
                    <Mail className="h-5 w-5" />
                  </a>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Mission section */}
        <div className="mb-12">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
            Our Mission
          </h2>
          <div className="prose prose-lg max-w-none dark:prose-invert">
            <p>
              At Saad.dev, our mission is to keep you informed about the rapidly evolving tech landscape. 
              We're passionate about delivering thoughtful analysis and insights that help you understand 
              the implications of new technologies, startups, and industry trends.
            </p>
            <p>
              As technology continues to transform every aspect of our lives, staying informed is more 
              important than ever. That's why we're committed to bringing you content that's not just 
              news, but meaningful analysis that helps you see the bigger picture.
            </p>
            <p>
              From artificial intelligence and machine learning to startup innovations and software development, 
              we cover a wide range of topics that matter to tech enthusiasts, professionals, and curious readers alike.
            </p>
          </div>
        </div>

        {/* Values section */}
        <div className="mb-12">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
            Our Values
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-white dark:bg-gray-900 p-6 rounded-lg border border-gray-200 dark:border-gray-800">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">
                Insightful Analysis
              </h3>
              <p className="text-gray-600 dark:text-gray-300">
                We go beyond surface-level reporting to provide context, insights, and analysis.
              </p>
            </div>
            <div className="bg-white dark:bg-gray-900 p-6 rounded-lg border border-gray-200 dark:border-gray-800">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">
                Accuracy & Clarity
              </h3>
              <p className="text-gray-600 dark:text-gray-300">
                We're committed to accurate reporting and clear, accessible explanations of complex topics.
              </p>
            </div>
            <div className="bg-white dark:bg-gray-900 p-6 rounded-lg border border-gray-200 dark:border-gray-800">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">
                Forward-Thinking
              </h3>
              <p className="text-gray-600 dark:text-gray-300">
                We focus on innovations that matter and help you understand what's coming next.
              </p>
            </div>
            <div className="bg-white dark:bg-gray-900 p-6 rounded-lg border border-gray-200 dark:border-gray-800">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">
                Community-Focused
              </h3>
              <p className="text-gray-600 dark:text-gray-300">
                We value our community of readers and aim to foster meaningful discussion around technology.
              </p>
            </div>
          </div>
        </div>

        {/* Contact section */}
        <div className="mb-12">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
            Get in Touch
          </h2>
          <p className="text-gray-600 dark:text-gray-300 mb-6">
            Have questions, feedback, or suggestions? Feel free to reach out.
          </p>
          <a
            href={`mailto:${author.email}`}
            className="inline-flex items-center px-6 py-3 text-white font-medium bg-primary rounded-lg hover:bg-primary/90 focus:ring-4 focus:outline-none focus:ring-primary/50"
          >
            <Mail className="h-5 w-5 mr-2" />
            Contact Us
          </a>
        </div>

        {/* Newsletter section */}
        <div className="mt-16">
          <NewsletterSignup />
        </div>
      </div>
    </div>
  );
}
