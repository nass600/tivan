// const app = require('./package.json')

module.exports = {
    plugins: [
        ['@semantic-release/commit-analyzer', {
            releaseRules: [
                { type: 'build', release: 'patch' },
                { type: 'ci', release: 'patch' },
                { type: 'feat', release: 'minor' },
                { type: 'fix', release: 'patch' },
                { type: 'perf', release: 'patch' },
                { type: 'refactor', release: 'patch' },
                { type: 'style', release: 'patch' },
                { type: 'revert', release: 'patch' },
                { breaking: true, release: 'major' },
                { revert: true, release: 'patch' }
            ]
        }],
        '@semantic-release/release-notes-generator',
        '@semantic-release/changelog',
        ['@semantic-release/npm', { npmPublish: false }],
        '@semantic-release/git',
        ['@semantic-release/github', {
            assets: 'build/*.zip'
        }]
    ],
    // eslint-disable-next-line no-template-curly-in-string
    tagFormat: '${version}'
    // verifyConditions: ['semantic-release-chrome', '@semantic-release/github'],
    // prepare: [
    //     {
    //         path: 'semantic-release-chrome',
    //         asset: `build/${app.name}.zip`,
    //         manifestPath: 'src/chrome/manifest.json'
    //     }
    // ]
    // publish: [
    //     {
    //         path: 'semantic-release-chrome',
    //         asset: 'my-extension.zip',
    //         extensionId: 'mppjhhbajcciljocgbadbhbgphjfdmhj'
    //     }
    // ]
}
