export default async function ({store, redirect}) {

    if (!store.state.auth.usuario.status.loggedIn) {
        return redirect('/Login')  
    }
    
}
