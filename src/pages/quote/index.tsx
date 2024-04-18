import { memo, useCallback, useEffect, useState } from "react";
import "./style.scss";
import useAllQuotes from "../../store/allquotes";
import { Pagination, PaginationProps } from "antd";
import request from "../../server/request";
import TagType from "../../types/tag";
import AuthorType from "../../types/author";

const QuotePage = () => {
  const { allquotes, searchQuotes, searchTotal, total, getAllQuotes, searchAllQuotes } = useAllQuotes();

  const [search, setSearch] = useState("");
  const [page, setPage] = useState<number>(1);
  const [tags, setTags] = useState<string>("");
  const [allTags, setAllTags] = useState([])
  const [allAuthors, setAllAuthors] = useState([])
  const [author, setAuthor] = useState<string>("");

  const handlePagination: PaginationProps["onChange"] = (page) => {
    setPage(page)
  }

  const handleTags = useCallback((e: React.ChangeEvent<HTMLSelectElement>) => {
    setPage(1)
    setTags(e.target.value)
    setSearch("")
  }, [])

  const handleAuthors = useCallback((e: React.ChangeEvent<HTMLSelectElement>) => {
    setPage(1)
    setAuthor(e.target.value)
    setSearch("")
  }, [])

  useEffect(() => {
    const getTags = async () => {
      const { data } = await request("tags");
      setAllTags(data);
    }
    getTags()
  }, [])

  useEffect(() => {
    const getAuthors = async () => {
      const { data } = await request("authors")
      setAllAuthors(data?.results)
    }
    getAuthors()
  }, [])

  useEffect(() => {
    let subscribed = true;
    if (subscribed ) {
      if (search == "") {
        getAllQuotes(page, tags, author)
      } else {
        searchAllQuotes(search)
      }
    }
    return () => {
      subscribed = false
    }
  }, [getAllQuotes, page, tags, author, search, searchAllQuotes])


  return (
    <section id="quotes" className="allquotes">
      <div className="container allquotes__container">
        <div className="allquotes__header">
        </div>
        <div className="allquotes__filter">
          <h1 className="allquotes__title">Quotes</h1>
          <input placeholder="searching..." type="text" value={search} onChange={(e) => setSearch(e.target.value)} />
          <div className="allquotes__select">
            <select value={tags} onChange={handleTags} name="tags" id="tags">
              <option value="" selected>Categories</option>
              {allTags?.map((tag: TagType) => tag?.quoteCount > 0 ? <option key={tag?._id} value={tag?.name}>{tag?.name}</option> : null)}
            </select>
            <select value={author} onChange={handleAuthors} name="tags" id="tags">
              <option value="" selected>Authors</option>
              {allAuthors?.map((author: AuthorType) => author?.quoteCount > 0 ? <option key={author?._id} value={author?.name}>{author?.name}</option> : null)}
            </select>
          </div>
        </div>
        <p className="allquotes__count">A total of {search.length != 0 ? searchTotal : total} quotes found</p>
        <div className="allquotes__row">
          {search.length == 0 ? allquotes?.map((data) => <div key={data?._id} className="allquotes__card">
            <div className="allquotes__tags">
              {data?.tags.map((tag) => <p key={tag} className="allquotes__tag">&#35;{tag}</p>)}
            </div>
            <p className="allquotes__content">{data?.content}</p>
            <p className="allquotes__author">-{data?.author}</p>
          </div>) : searchQuotes?.map((data) => <div key={data?._id} className="allquotes__card">
            <div className="allquotes__tags">
              {data?.tags.map(tag => <p className="allquotes__tag">&#35;{tag}</p>)}
            </div>
            <p className="allquotes__content">{data?.content}</p>
            <i>-{data?.author}</i>
          </div>)}
        </div>
        {total > 20 || searchTotal > 20 ? <div className="pagination">
          <Pagination current={page} pageSize={20} onChange={handlePagination} total={search.length != 0 ? searchTotal : total} />
        </div> : null}
      </div>
    </section>
  )
}

const MemoQuotePage = memo(QuotePage)
export default MemoQuotePage