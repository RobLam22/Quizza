export async function apiCall() {
    try {
        const response = await fetch('https://opentdb.com/api.php?amount=10');
        const data = await response.json();
        setupAnswers(data);
    } catch (error) {
        console.error('ERROR', error);
        return null;
    }
}
