<template>
    <v-app :class="{ 'rotate': $route.meta.loading }" style="max-height:100vh;"
        v-touch="{ left: () => $replace('menu'), right: () => $replace('/') }">

        <NetworkMeshWire :index="'-1'">

            <div  v-if="photos[0]"  id="chattingInbox" :style="{ height: 'calc(100vh - 120px)' }">
                <div v-for="(message, i) in messages" :key="i" class="">

                    <div v-if="(i % 2) == 0" class="text-right text-message-width" style="margin-left:auto">
                        <v-card class="chattingMessage senderMessage" :text="message.message" variant="tonal">
                            <div class="text-end pr-4" style="font-size:13px;">{{ message.date }}</div>
                        </v-card>
                    </div>

                    <div v-else class="text-left text-message-width" style="margin-right:auto">
                        <div class="d-flex p-2">
                            <img :src="photos[0][i].src.tiny" width="54" height="54"
                                style="border-radius: 50%;" alt="Loading...">
                            <v-card theme="test" class="chattingMessage" :title="message.name" :text="message.message"
                                variant="tonal">
                                <div class="pl-4" style="font-size:13px;">{{ message.date }}</div>
                            </v-card>
                        </div>
                    </div>

                </div>
            </div>

        </NetworkMeshWire>
        <div class="position-fixed w-100" style="bottom:0;">
            <v-bottom-navigation bg-color="info" :elevation="5" grow mode="shift">
                <v-btn theme="zplus" to="/" aria-current="page" @click="$replace('/')">
                    <v-icon><font-awesome-icon icon="fa-solid fa-house-user" /></v-icon>
                    <span>Home</span>
                </v-btn>
                <div class="chat-footer">
                    <input type="text" class="chat-input" placeholder="Type a message...">
                    <button class="send-btn">Send</button>
                </div>
            </v-bottom-navigation>


        </div>
    </v-app>
</template>

<script>
import { mapGetters } from 'vuex'
import { createClient } from 'pexels';

const client = createClient('vBpE3TxdNb8R0wOc0yhweBXAC3QQURXUACE10g7BBIZEpsSfp6bPiXdi');

export default {
    data() {
        return {
            langs: ['en', 'be', 'da', 'hr'],
            api: 'vBpE3TxdNb8R0wOc0yhweBXAC3QQURXUACE10g7BBIZEpsSfp6bPiXdi',
            messages: [
                {
                    'name': 'Zin Min', 'message': 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quibusdam, quidem magni aliquid maxime pariatur dolorum magnam alias labore inventore provident suscipit officia voluptatem repellendus error impedit.Alias quaerat ab itaque.', 'date': '1 hour ago'
                },
                { 'name': 'Zakerxa', 'message': 'Quibusdam, quidem magni aliquid maxime pariatur dolorum magnam', 'date': '1 hour ago' },
                { 'name': 'Zin Min', 'message': 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quibusdam, quidem magni aliquid maxime pariatur dolorum magnam alias labore inventore provident suscipit officia voluptatem repellendus error impedit.Alias quaerat ab itaque.', 'date': '1 hour ago' },
                { 'name': 'Jenny', 'message': 'Quibusdam, quidem magni aliquid maxime pariatur dolorum magnam alias labore inventore provident suscipit officia voluptatem repellendus error impedit.Alias quaerat ab itaque.', 'date': '1 hour ago' },
                { 'name': 'Zin Min', 'message': 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quibusdam, quidem magni aliquid maxime pariatur dolorum magnam alias labore inventore provident suscipit officia voluptatem repellendus error impedit.Alias quaerat ab itaque.', 'date': '1 hour ago' },
                { 'name': 'Peter', 'message': 'Consectetur adipisicing elit. Quibusdam, quidem magni aliquid maxime pariatur dolorum magnam alias labore inventore provident suscipit officia voluptatem repellendus error impedit.Alias quaerat ab itaque.', 'date': '1 hour ago' }
            ],
            photos: []
        }
    },
    computed: mapGetters(['count', 'auth', 'authUser', 'globalNoti']),
    mounted() {
        const query = 'Profile';

        client.photos.search({ query, per_page: 6 }).then(photos => {
            this.photos.push(photos.photos);
        });
}
}
</script>

<style lang="scss">
.v-card-item {
    padding: 0;
}

.v-card-text {
    padding-left: 0;
    padding-bottom: 10px;
}

.center {
    position: absolute;
    top: 50%;
    left: calc(50% + 12rem);
    transform: translate(-50%, -50%);
}

.pic {
    width: 4rem;
    height: 4rem;
    background-size: cover;
    background-position: center;
    border-radius: 50%;
}

.contact {
    position: relative;
    height: 4.5rem;
    display: flex;
    flex-direction: column;
    justify-content: center;
}

.name {
    font-weight: bold;
    font-size: 17px;
}


.date {
    position: absolute;
    text-align: end;
    top: 15px;
    right: 0;
}

#chattingInbox {
    flex-shrink: 2;
    z-index: 1;
    width: 100%;
    overflow-x: hidden;
    overflow-y: auto;
    margin-bottom: 100px;
}

.chattingMessage {
    box-sizing: border-box;
    padding: 0.5rem 1rem;
    margin: 1rem;
    // background: #6d99ff;
    border-radius: 0 1.125rem 1.125rem 1.125rem;
    min-height: 2.25rem;
    width: fit-content;
    max-width: 64%;
    font-family: 'Poppins', sans-serif;
    text-align: justify;
    word-wrap: break-word;
    box-shadow:
        0 0 2rem rgba(black, 0.075),
        0rem 1rem 1rem -1rem rgba(black, 0.1);
}

.senderMessage {
    margin: 1rem 1rem 1rem auto;
    border-radius: 1.125rem 1.125rem 0 1.125rem;
    // background: #ffcbe2;
}


.chat-footer {
    display: flex;
    align-items: center;
    background-color: #f2f2f2;
    bottom: 0;
    padding: 10px;
    width: 100%;
}

.chat-input {
    flex-grow: 1;
    border: none;
    border-radius: 20px;
    padding: 10px;
    margin-right: 10px;
}

.send-btn {
    background-color: #4a4a4a;
    color: #fff;
    border: none;
    border-radius: 20px;
    padding: 10px 20px;
    cursor: pointer;
}
</style>
