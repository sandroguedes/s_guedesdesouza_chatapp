import ChatMessage from "./components/TheMessageComponent.js"

(() => {
    console.log('George RR Martin will finish freaking WINDS OF WINTER before I manage to properly debug this thing...');   
    
    const socket = io();

    function setUserId({ socketID, message }) {
        vm.socket_ID = socketID;
    }

    function appendMessage(message) {
        console.log(vm);
        vm.messages.push(message);
        vm.$refs.notification_sound.play();
    }

    const vm = new Vue({
        data: {
            messages: [],
            nickname: "",
            socket_ID: "",
            message: "",
            inTheChat: false
        },
        create: function() {
            console.log("IT's ON!");
        },
        methods: {
            joinTheChat() {
                this.inTheChat = true;
                vm.$refs.boot_sound.play();
            },
            dispatchMessage() {
                socket.emit('chatmessage', { content: this.message, name: this.nickname || "Anonymous" });
                this.message="";
            }
        },
        components: {
            newmessage: ChatMessage
        }
    }).$mount("#app");

    socket.addEventListener("connected", setUserId);
    socket.addEventListener("message", appendMessage);
})();