//ruta principal y plantilla base
Router.configure({
    layoutTemplate: 'layout',
    notFoundTemplate: 'notFound',
});

Router.route('/registro', function() {
    //this.render('registro');
    if (isHTTPS()) {
        this.render('registro');
    } else {
        switchHTTPS();
    }
});

Router.route('/acceso', function() {
    //this.render('acceso');
    if (isHTTPS()) {
        this.render('acceso');
    } else {
        switchHTTPS();
    }
});

Router.route('/modificar', function() {
    // this.render('modificarUsuario');
    if (isHTTPS()) {
        this.render('modificarUsuario');
    } else {
        switchHTTPS();
    }
});

Router.route('/', function() {
    if (isHTTPS()) {
        this.render('home');
    } else {
        switchHTTPS();
    }
    //this.render('home');
});

Router.route('/agregarTesoro', function() {
    if (isHTTPS()) {
        this.render('agregarTesoro');
    } else {
        switchHTTPS();
    }
}, {
    name: 'agregarTesoro'
});
Router.route('/listarTesoros', function() {
    if (isHTTPS()) {
        this.render('listarTesoros');
    } else {
        switchHTTPS();
    }
    //this.render('home');
}, {
    name: 'listarTesoros'
});
Router.route('/juego/:_id', {
    name: 'visorMapa',
    data: function() {
        return juego.findOne({
            _id: this.params._id
        });
    }
});

AccountController = RouteController.extend({
    verifyEmail: function() {
        Accounts.verifyEmail(this.params.token, function() {
            Bert.alert('Email verificado! Gracias!', 'success');
            Router.go('/');
        });
    },
    resetPassword: function() {
        Accounts.resetPassword(this.params.token, 'YCHh2ku7', function() {
            Bert.alert('Su contraseña ha cambiado', 'success');
            Router.go('/');
        });
    }
});

Router.map(function() {

    this.route('verifyEmail', {
        controller: 'AccountController',
        path: '/verify-email/:token',
        action: 'verifyEmail'
    });

    this.route('verified', {
        path: '/verified',
        template: 'verified'
    });

    this.route('checkemail', {
        path: '/checkemail',
        template: 'checkemail'
    });

    this.route('resetPassword', {
        controller: 'AccountController',
        path: '/reset-password/:token',
        action: 'resetPassword'
    });
});