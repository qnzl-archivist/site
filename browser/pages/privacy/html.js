const html = require(`choo/html`)

module.exports = (functions, state, emit) => html`
  <div>
    <span class="flex mb-2">Hey,</span>

    <span class="flex mb-2">I have zero interest in looking at your data. In addition, I won't be enabling functionality for non-public data until I prove out Archivist and build out data encryption.</span>

    <span class="flex mb-2">Your authentication tokens use the minimal scope required. Your authentication tokens expire semi-frequently and are automatically refreshed. At any time, you can revoke Archivist access either through the site here or through the service by revoking app permissions</span>

    <span class="flex mb-2">If you have any concerns or questions, tweet (@madamelic) or email (any address at qnzl.co).</span>
  </div>
`

