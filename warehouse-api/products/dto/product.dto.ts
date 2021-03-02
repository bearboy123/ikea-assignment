import ArticleDto from './article.dto'
import ComposeDto from './compose.dto';

export default interface ProductDto{
      name: string,
      contains: ComposeDto[]
}