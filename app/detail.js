import React, {
    Component
} from 'react';
import {
    WebView
} from 'react-native';

export default class Detail extends Component {
    render() {
        return (
            <WebView source = {{uri: this.props.data.url}}
            style = {{flex: 1, margin: 8}}
            />
        );
    }
}