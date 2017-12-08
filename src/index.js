import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';


const API_LINK = 'https://api.tumblr.com/v2/blog/protobacillus/posts?api_key=VHnwo1jAWQIQ9kmAdkjNUlBx4dSJgxPYNADdbB6FvwVlCtHYv3&tag=gif'


class Page extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            img_src: ''
        }
    }

    componentWillMount() {
        this.getPosts();
    }

    getPosts() {
        var self = this;
        fetch(API_LINK, {
            'Access-Control-Allow-Origin':'*',
            'Content-Type': 'multipart/form-data'
        }).then(
            res => res.json()
        ).then(function(result) {
            var random_number = Math.floor(Math.random() * result.response.total_posts);
            fetch(API_LINK+'&limit=1&offset='+random_number).then(
                res => res.json()
            ).then(function(result) {
                self.setState({img_src: result.response.posts[0].photos[0].original_size.url})
            })
        });
    }
    
    render() {
        return [
            <NextGifButton clickHandler={this.getPosts.bind(this)} />,
            <Gif img_url={this.state.img_src}/>
        ];
    }
}

class NextGifButton extends React.Component {
    clickHandler() {
        this.props.clickHandler();
    }

    render() {
        return (
            <div onClick={this.clickHandler.bind(this)} className="next-gif-button">NEXT</div>
        );
    }
}

class Gif extends React.Component {
    render() {
        return (
            <div>
                <img className="img-gif" alt="" src={this.props.img_url} />
            </div>
        );
    }
}

ReactDOM.render(
    <Page />,
    document.getElementById('root')
);