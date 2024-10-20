import React from 'react';

const AboutUs = () => {
  return (
    <section className="bg-white py-12 max-h-screen mt-14 max-w-screen-2xl container mx-auto md:px-20 px-4 bg-white text-black dark:bg-black dark:text-white">
      <div className="container mx-auto px-4 ">
        <div className="text-center">
          <h2 className="text-4xl font-semibold mb-6 hover:text-cyan-400">About Us</h2>
          <p className="text-lg mb-8 ">
            Welcome to AI Haven, your number one source for all things of AI. We're dedicated to giving you the very best of ML, with a focus on variety, customer service, and uniqueness.
          </p>
        </div>
        <div className="flex flex-wrap justify-center">
          <div className="w-full md:w-1/2 lg:w-1/3 p-4">
            <div className="h-full bg-gray-100 p-6 rounded-lg shadow-lg">
              <h3 className="text-2xl font-medium text-gray-800 mb-4">Our Mission</h3>
              <p className="text-gray-600">
                Our mission is to provide a wide range of AI Services that cater to all ages and interests, ensuring a seamless experience for all AI lovers.
              </p>
            </div>
          </div>
          <div className="w-full md:w-1/2 lg:w-1/3 p-4">
            <div className="h-full bg-gray-100 p-6 rounded-lg shadow-lg">
              <h3 className="text-2xl font-medium text-gray-800 mb-4">Our Story</h3>
              <p className="text-gray-600">
                Founded in 2024 by Demon Group, AI Haven has come a long way from its beginnings in a small office. When first started out, passion for AI drove her to quit her day job and turn hard work and inspiration into a booming online store.
              </p>
            </div>
          </div>
          <div className="w-full md:w-1/2 lg:w-1/3 p-4">
            <div className="h-full bg-gray-100 p-6 rounded-lg shadow-lg">
              <h3 className="text-2xl font-medium text-gray-800 mb-4">Our Values</h3>
              <p className="text-gray-600">
                We believe in treating our customers with respect and providing them with the best service possible. We are committed to delivering high-quality products and continuously improving our site.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default AboutUs;
