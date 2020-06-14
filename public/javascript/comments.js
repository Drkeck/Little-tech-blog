async function commentsFormHandler(event) {
    event.preventDefault();

    const comment_text = document.querySelector('#comment_text').value.trim();

    if (comment_text) {
        const response = await fetch('/api/comments', {
            method: 'post',
            body: JSON.stringify({
                comment_text
            }),
            headers: { 'Content-Type': 'application/json'}
        })

        if (response.ok) {
            document.location.replace('/dashboard');
        } else {
            alert(response.statusText);
        }
    }
}

document.querySelector('#comment-form').addEventListener('submit', commentsFormHandler);