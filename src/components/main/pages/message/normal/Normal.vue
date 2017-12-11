<template>
    <div>
        <Send :sendType="1"></Send>
    </div>
</template>
<script>
    import Send from '../_components/send/Send.vue';
    export default{
        components: {
            Send
        }
    }
</script>