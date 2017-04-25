import React, {Component} from 'react';
import {Text} from 'react-native';
import {connect} from 'react-redux';
import {Actions} from 'react-native-router-flux';
import {idChanged, loginUser, fetchCredentials} from '../actions';
import {Card, CardSection, Input, Button, Spinner} from './common';

class LoginForm extends Component {
    componentWillMount() {
        this.props.fetchCredentials();
    }

    onIdChanged(text) {
        this.props.idChanged(text);
    }

    onButtonPress() {
        const {userId} = this.props;
        if (!userId || userId.length < 8) {
            alert('Ingrese bien sus datos')
        }
        else {
            this.props.loginUser({userId});
        }
    }

    renderButton() {
        if (this.props.loading) {
            return <Spinner size="large"/>;
        }

        return (
            <Button onPress={this.onButtonPress.bind(this)}>
                Login
            </Button>
        );
    }

    renderForm() {
        if (this.props.loading) {
            return <Spinner size="large"/>
        }
        return (
            <Card>
                <CardSection>
                    <Input
                        label="DNI"
                        placeholder="Ingrese su DNI"
                        onChangeText={this.onIdChanged.bind(this)}
                        value={this.props.userId}
                    />
                </CardSection>


                <Text style={styles.errorTextStyle}>
                    {this.props.error}
                </Text>

                <CardSection>
                    {this.renderButton()}
                </CardSection>
            </Card>
        );

    }

    render() {
        return this.renderForm();
    }
}

const styles = {
    errorTextStyle: {
        fontSize: 20,
        alignSelf: 'center',
        color: 'red'
    }
};

const mapStateToProps = ({auth}) => {
    const {userId, error, loading} = auth;

    return {userId, error, loading};
};

export default connect(mapStateToProps, {
    idChanged, loginUser, fetchCredentials
})(LoginForm);
