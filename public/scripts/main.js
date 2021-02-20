import ChatMessage from "./components/TheMessageComponent.js"

(() => {
    console.log('George RR Martin will finish freaking WINDS OF WINTER before I manage to properly debug this thing...');   
    const socket = io();

    function setUserId({ socketID, message }) {
        vm.socket_ID = socketID;
    }

    function appendMessage(message) {
        console.log(vm);
        vm.messages.push(message);;
        vm.$refs.notification_sound.play();
    }

    const vm = new Vue({
        data: {
            messages: [],
            nickname: "",
            socket_ID: "",
            message: "",
            joined: false
        },
        create: function() {
            console.log("IT's ON!");
        },
        methods: {
            makeItScroll() {
                return this.$refs.messages.scrollTop + this.$refs.messages.clientHeight === this.$refs.messages.scrollHeight;
            },
            scrollToBottom() {
                console.dir(this.$refs.messages);
                this.$refs.messages.scrollTop = this.$refs.messages.scrollHeight;
            },
            joinChat() {
                this.joined = true;
                vm.$refs.boot_sound.play();
            },
            dispatchMessage() {
                socket.emit('ChatMESSAGE', { content: this.message, name: this.nickname || "Anonymous" });
            }
        },
        components: {
            newmessage: ChatMessage
        }
    }).$mount("#app");

    socket.addEventListener("CONNECTED", setUserId);
    socket.addEventListener("MESSAGE", appendMessage);
})();