const html = require(`choo/html`)

module.exports = (functions, state) => html`
  <!-- branded lifetime cta start -->
  <div class="bg-gray-800">
    <div class="max-w-2xl mx-auto text-center py-16 px-4 sm:py-20 sm:px-6 lg:px-8">
      <h2 class="text-3xl font-extrabold text-white sm:text-4xl">
        <span class="block">Archive all of your online content.</span>
      </h2>
      <p class="mt-4 text-lg leading-6 text-indigo-200">
        Archive all of your tweets, status updates, comments, and everything else you do on the internet. It's like a backup drive for everything you post to the web.
      </p>
      <a href="/register" class="mt-8 w-full inline-flex items-center justify-center px-5 py-3 border border-transparent text-base font-medium rounded-md text-indigo-600 bg-white hover:bg-indigo-50 sm:w-auto">
        Archive my data
      </a>
    </div>
  </div>
  <!-- branded lifetime cta end -->
`
