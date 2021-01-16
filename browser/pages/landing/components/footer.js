const html = require(`choo/html`)

module.exports = (functions, state) => html`
  <footer class="bg-white" aria-labelledby="footerHeading">
    <h2 id="footerHeading" class="sr-only">Footer</h2>
    <div class="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:py-16 lg:px-8">
      <div class="xl:grid xl:grid-cols-3 xl:gap-8">
        <div class="space-y-8 xl:col-span-1">
          <p class="text-gray-500 text-base">
            Made by <a href="https://twitter.com/madamelic" target="_blank">@madamelic</a> 🤖
          </p>
        </div>
        <div class="mt-12 grid grid-cols-2 gap-8 xl:mt-0 xl:col-span-2">
          <div class="md:grid md:grid-cols-2 md:gap-8">
            <div>
              <h3 class="text-sm font-semibold text-gray-400 tracking-wider uppercase">
                Policies
              </h3>
              <ul class="mt-4 space-y-4">
                <li>
                  <a href="/privacy" class="text-base text-gray-500 hover:text-gray-900">
                    Privacy + Data Security
                  </a>
                </li>
              </ul>
            </div>
            <div class="mt-12 md:mt-0">
              <h3 class="text-sm font-semibold text-gray-400 tracking-wider uppercase">
                Support
              </h3>
              <ul class="mt-4 space-y-4">
                <li>
                  <a href="mailto:maddie@qnzl.co" class="text-base text-gray-500 hover:text-gray-900">
                    Email
                  </a>
                </li>

                <li>
                  <a href="https://twitter.com/madamelic" class="text-base text-gray-500 hover:text-gray-900">
                    Twitter
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  </footer>

`
