import { Repository } from 'typeorm';
import { Post } from '../../entity/posts.entity';
import { AppDataSource } from '../../data-source';

export class PostService {
  private static instance: PostService;
  private postRepository: Repository<Post>;

  private constructor() {
    this.postRepository = AppDataSource.getRepository(Post);
  }

  public static getInstance(): PostService {
    if (!PostService.instance) {
      PostService.instance = new PostService();
    }
    return PostService.instance;
  }

  async getAllPosts(): Promise<Post[]> {
    return this.postRepository.find();
  }

  async createPost(postData: Partial<Post>): Promise<Post> {
    const post = this.postRepository.create(postData);
    return this.postRepository.save(post);
  }

  async getPostById(id: string): Promise<Post | null> {
    return this.postRepository.findOneBy({ id });
  }

  async updatePost(id: string, postData: Partial<Post>): Promise<Post | null> {
    await this.postRepository.update(id, postData);
    return this.getPostById(id);
  }

  async deletePost(id: string): Promise<void> {
    await this.postRepository.delete(id);
  }
}
