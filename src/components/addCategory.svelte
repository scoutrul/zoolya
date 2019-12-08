<script>
    import Input from './Input.svelte'
    export let label = 'NOT SET'
    export let name
    export let value = ''
    export let type = 'text'
    
    const onBlur = event => {
        value = event.target.value
    }
</script>

<label>
    <span>{label}</span>
    <Input  {name} {onBlur} {type} />
</label>