export const sendMailAllURL = (emailList: string[]) => {
    const url = `https://mail.google.com/mail/u/0/?fs=1&bcc=${emailList.join(',')}&tf=cm`;
    return url;
}

export const openInNewTab = (url) => {
    const newWindow = window.open(url, '_blank', 'noopener,noreferrer')
    if (newWindow) newWindow.opener = null
}
