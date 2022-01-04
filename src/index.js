"use strict"

const now = Date.now()
const max_stamina_id = document.getElementById('max_stamina')
const stamina_id = document.getElementById('stamina')
const timer_set_id = document.getElementById('timer_set')
const timer_form_id = document.getElementById('timer_form')
const recovery_at = document.getElementById('recovery_at')

function value_input(evt) {
    const target = evt.target

    if (target.value.length > target.max.length) {
        target.value = target.value.slice(0, target.max.length)
    }
}

function update_time() {
    const stamina = parseInt(stamina_id.value)
    const max_stamina = parseInt(max_stamina_id.value)

    if (stamina < max_stamina) {
        const store = window.localStorage
        store.setItem("stamina", stamina)
        store.setItem("max_stamina", max_stamina)

        const diff = max_stamina - stamina
        //1stamina per 6min
        const time_diff = diff * 6 * 60000
        const stamina_ready_time = new Date(now + time_diff)
        recovery_at.innerHTML = stamina_ready_time.toLocaleTimeString("en-GB", { hour12: false })
        timer_set_id.disabled = false
    } else {
        recovery_at.innerHTML = ""
        timer_set_id.disabled = true
    }
}

function on_max_stamina_set() {
    update_time()
    stamina_id.max = max_stamina_id.value
    if (max_stamina_id.checkValidity()) {
        const store = window.localStorage
        const max_stamina = parseInt(max_stamina_id.value)
        store.setItem("max_stamina", max_stamina)
    }
}

function on_stamina_set() {
    update_time()
}

function timer_set() {
    return false
}

function on_init() {
    const store = window.localStorage
    const max_stamina = store.getItem("max_stamina") || 135
    store.setItem("max_stamina", max_stamina)
    max_stamina_id.value = max_stamina

    const stamina = store.getItem("stamina") || max_stamina
    store.setItem("stamina", stamina)
    stamina_id.value = stamina

    stamina_id.max = max_stamina_id.value
    update_time()
}

window.addEventListener("load", on_init)
timer_form_id.onsubmit = timer_set
stamina_id.addEventListener('input', value_input)
max_stamina_id.addEventListener('input', value_input)
max_stamina_id.addEventListener('change', on_max_stamina_set)
stamina_id.addEventListener('change', on_stamina_set)
