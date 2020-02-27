class Configs {
	hostAndPort = window.location.host.split(':');
	protocol = 'http://';
	port = '1234';
	host = this.hostAndPort[0] + ':';
	url = this.protocol + this.host + this.port;
	headers = { 'Content-Type': 'application/json'}
}

export default new Configs();