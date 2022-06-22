function codeToInject() {
  navigator.__defineGetter__('platform', function() {
    return 'iOS'
  })
  console.log('navigator.platform:', window.navigator.platform)
}

function embed(fn) {
  const script = document.createElement("script")
  script.text = `(${fn.toString()})();`
  document.documentElement.appendChild(script)
}

chrome.runtime.sendMessage({ shouldIRun: true }, function(response) {
  if (response) {
    console.log('Spoofing navigator.platform...')
    embed(codeToInject)
  }
})
