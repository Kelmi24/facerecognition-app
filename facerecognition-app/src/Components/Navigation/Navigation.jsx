const Navigation = ({ onRouteChange, isSignedIn }) => {
    if (isSignedIn) {
        return (
        <nav style={{display: 'flex', justifyContent: 'flex-end', padding: '20px', zIndex: 10, position: 'relative'}}>
            <button 
                onClick={() => onRouteChange('signout')} 
                className="glass-nav-button"
                aria-label="Sign out of your account"
            >
                Sign Out
            </button>
        </nav>
        );
    } else {
        return (
        <nav style={{display: 'flex', justifyContent: 'flex-end', padding: '20px', zIndex: 10, position: 'relative'}}>
            <button 
                onClick={() => onRouteChange('signin')} 
                className="glass-nav-button"
                aria-label="Sign in to your account"
            >
                Sign In
            </button>
            <button 
                onClick={() => onRouteChange('register')} 
                className="glass-nav-button"
                aria-label="Create a new account"
            >
                Register
            </button>
        </nav>
        );
    }
}

export default Navigation