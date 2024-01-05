export class ApiUrl {
	private devUrl = "http://localhost:8000";

	public param: string | undefined;
	constructor(param?: string) {
		this.param = param;
	}

	// authentication routes
	public login: string = this.devUrl + "/api/user/login";
	public signup: string = this.devUrl + "/api/user/login";

	//blog routes
	public getAllBlogs = this.devUrl + "/api/blog";
	public getASingleBlog = () => `${this.devUrl}/api/blog/${this.param ?? ""}`;
	public createANewBlog = this.devUrl + "/api/blog";
	public updateABlog = () => `${this.devUrl}/api/blog/${this.param ?? ""}`;
	public deleteABlog = () => `${this.devUrl}/api/blog/${this.param ?? ""}`;
}
