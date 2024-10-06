import { Router } from 'express';
import { PostService } from '../posts/service/posts.service';

const router = Router();
const postService = PostService.getInstance();

router.get('/', async (req, res) => {
  const posts = await postService.getAllPosts();

  res.json(posts);
});

router.post('/', async (req, res) => {
  const post = await postService.createPost(req.body);

  res.status(201).json(post);
});

router.get('/:id', async (req, res) => {
  const id = req.params.id;

  const post = await postService.getPostById(id);

  if (post) {
    res.json(post);
  } else {
    res.status(404).send('Post not found');
  }
});

router.put('/:id', async (req, res) => {
  const id = req.params.id;

  const updatedPost = await postService.updatePost(id, req.body);

  if (updatedPost) {
    res.json(updatedPost);
  } else {
    res.status(404).send('Post not found');
  }
});

router.delete('/:id', async (req, res) => {
  const id = req.params.id;

  await postService.deletePost(id);

  res.status(204).send();
});

export default router;
