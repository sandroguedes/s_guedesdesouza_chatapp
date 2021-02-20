export default {
    props: ['message'],

    template: `
    <article>
        <h3 class="Sender">
            <span>{{message.message.name}}</span> says
        </h3>
        <p class="onScreenMessage">{{message.message.content}}</p>
    </article>
    `
}