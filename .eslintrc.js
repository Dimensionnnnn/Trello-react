module.exports = {
    extends: ['react-app', 'plugin:prettier/recommended'],
    plugins: ['prettier'],
    rules: {
        'no-console': 'warn',
        'prettier/prettier': [
            'error',
            {
                endOfLine: 'auto',
            },
        ],
        'import/order': [
            'error',
            {
                groups: ['builtin', 'external', 'internal'],
                pathGroups: [
                    { pattern: 'react', group: 'external', position: 'before' },
                ],
                pathGroupsExcludedImportTypes: ['react'],
                'newlines-between': 'always',
                alphabetize: { order: 'asc', caseInsensitive: true },
            },
        ],
    },
};
