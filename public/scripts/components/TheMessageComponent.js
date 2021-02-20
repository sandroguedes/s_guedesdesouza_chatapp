export default {
    props: ['message', 'socketID'],

    template: `
    <article>
        <h3 class="Sender">
            <span>{{message.message.name}}</span> said
        </h3>
        <p class="onScreenMessage">
        {{message.message.content}}
        </p>
    </article>
    `
}