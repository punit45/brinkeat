const verifyEmailTemplate = ({ name, url }) => {
    return `
        <p>Dear ${name}</p>
        <p>Thanks for registering with BlinkEat</p>
        <a href=${url} style="color: black; background: orange;display: block; margin-top: 10px">Verify Email</a>
    `
}

export default verifyEmailTemplate                                                                                                  