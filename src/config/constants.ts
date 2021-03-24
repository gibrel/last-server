
export const jwtConstants = {
    secret: (process.env.USER_REQUEST_KEY) ? process.env.USER_REQUEST_KEY : 'not-a-good-secret',
    signOptions: { expiresIn: '60s' },
};