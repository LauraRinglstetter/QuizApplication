<template>
    <div>
        <h1>Fragenkataloge</h1>
        <div class="overview">
            <div> 
                <p>Erstelle oder erweitere deinen eigenen Fragenkatalog!</p>
                <router-link to="/userquestions">Zu deinem Fragenkatalog</router-link> 
            </div>
            <div> 
                <p>Erweitere zusammen mit deinem Team euren gemeinsamen Fragenpool! </p>
                <button>Zum Team-Fragenkatalog</button>
            </div>
        </div>
    </div>
</template>
<script>

</script>
<style scoped>
.overview{
    display: flex;
    justify-content: center;
    gap: 2rem;
    margin-top: 4rem;
}
.overview > div{
    width: 35%;
    padding: 1rem;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.2);
    border-radius: 10px;
    background-color: #fff;
    color: #000;
    text-align: center;
}
div > button, div > a{
    background-color: #0aa6d7;
    color: #fff;
    border: none;
    padding: 0.5rem 1rem;
    border-radius: 5px;
    cursor: pointer;
    font-size: 1rem;
    text-decoration: none;
}
</style>