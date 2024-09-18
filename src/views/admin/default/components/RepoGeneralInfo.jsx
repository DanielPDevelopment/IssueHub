/* eslint-disable no-shadow */
/* eslint-disable camelcase */
import Card from 'components/card';
import React, { useState } from 'react';
import ReactMarkdown from 'react-markdown';
import rehypeRaw from 'rehype-raw';
import rehypeHighlight from 'rehype-highlight';
import { MdLink } from 'react-icons/md';
import PropTypes from 'prop-types';
import useKeyDown from 'hooks/useKeyDown';

const RepoGeneralInfo = ({ issue }) => {
  const [isCopied, setIsCopied] = useState(false);

  const {
    name,
    description,
    url,
    issue_title,
    issue_url,
    state,
    created_at,
    body,
    language,
    git_url,
    ssh_url,
    comments,
    user,
    owner_raw,
  } = issue;

  function handleCopyClick(data) {
    navigator.clipboard.writeText(data)
      .then(() => setIsCopied(data))
      .catch((err) => console.error('Could not copy text: ', err));
  }

  return (
    <Card extra="w-full h-full p-3 bg-gray-light shadow-xl module-content">
      {/* Header */}
      <div className="mt-2 mb-4 w-full">
        <div className="flex wrap justify-between">
          <h4 className="px-2 text-xl font-bold text-white ">
            <span className="flex items-center">
              <div
                className="flex items-center mr-2"
                onClick={() => window.open(owner_raw.html_url, '_blank')}
                onKeyDown={(e) => useKeyDown(e, 'Enter', [() => window.open(owner_raw.html_url, '_blank')])}
                role="button"
                tabIndex={0}
              >
                <img
                  className="h-10 w-10 rounded-full cursor-pointer"
                  src={owner_raw.avatar_url}
                  alt={owner_raw.login}

                />
              </div>
              {issue_title}
              {' '}
              -

              <span
                className="font-italic text-orange-0/80 px-2 cursor-pointer"
                onClick={() => window.open(url, '_blank')}
                onKeyDown={(e) => useKeyDown(e, 'Enter', [() => window.open(url, '_blank')])}
                role="button"
                tabIndex={0}
              >
                {name}
              </span>

              <span className={`text-xs ${state === 'open' ? 'text-green-400' : 'text-red-400'}`}>{state === 'open' ? 'open' : state}</span>
              <MdLink
                className="ml-2 cursor-pointer"
                onClick={() => window.open(issue_url, '_blank')}
              />
            </span>
          </h4>
          <div className="flex wrap items-end">
            <span className="text-sm text-green-400 font-bold">
              clone repo -
              {'>'}
            </span>
            <div
              className="text-sm text-gray-400 px-2 cursor-pointer"
              onClick={() => handleCopyClick(ssh_url)}
              onKeyDown={(e) => useKeyDown(e, 'Enter', [() => handleCopyClick(ssh_url)])}
              role="button"
              tabIndex={0}
            >
              {isCopied === ssh_url && <span className="text-green-400">✔</span>}
              SSH
            </div>
            <div
              className="text-sm text-gray-400 cursor-pointer"
              onClick={() => handleCopyClick(git_url)}
              onKeyDown={(e) => useKeyDown(e, 'Enter', [() => handleCopyClick(git_url)])}
              role="button"
              tabIndex={0}
            >
              {isCopied === git_url && <span className="text-green-400">✔</span>}
              GIT
            </div>
          </div>
        </div>
        <p className="text-sm text-gray-400 px-2">
          {created_at.slice(0, 10)}
          {' '}
          -
          {' '}
          {language}
        </p>
        <h4 className="px-2 text-lg font-bold text-white mt-8">
          Issue Description:
        </h4>
        <div className="mt-2 px-2 text-base text-gray-400">
          {/* {body} */}
          <div
            className="flex items-center"
            onKeyDown={(e) => useKeyDown(e, 'Enter', [() => window.open(user.html_url, '_blank')])}
            onClick={() => window.open(user.html_url, '_blank')}
            role="button"
            tabIndex={0}
          >
            <img
              className="h-10 w-10 rounded-full mr-2 cursor-pointer"
              src={user.avatar_url}
              alt={user.login}
            />
            <span>
              <p className="text-sm text-gray-400 font-bold">{user.login}</p>
              <p className="text-xs text-gray-400 font-italic">
                {created_at.slice(0, 10)}
                {' '}
                |
                {' '}
                <span className="font-bold">{created_at.slice(11, 16)}</span>
                {' '}
              </p>
            </span>
          </div>
          <div className="text-base font-medium px-4 pl-12">
            <ReactMarkdown
              children={body}
              rehypePlugins={[rehypeRaw, [rehypeHighlight, { subset: ['javascript', 'css', 'html'] }]]}
              components={{
                a: ({ node, ...props }) => (
                  <a
                    {...props}
                    style={{ color: 'blue' }}
                    target="_blank"
                    rel="noopener noreferrer"
                  />
                ), // Style links differently
                code: ({
                  node, inline, className, children, ...props
                }) => {
                  const language = className && className.split('-')[1]; // Get language from className
                  if (!inline && language) {
                    return (
                      <pre>
                        <code {...props} className={`language-${language}`}>
                          {children}
                        </code>
                      </pre>
                    );
                  }
                  return <code {...props}>{children}</code>;
                },
              }}
            />
          </div>
        </div>
      </div>

      {comments.length ? (
        comments.map((item, idx) => (
          <div className="py-2 px-2 pl-10" key={item.id}>
            <div
              className={`flex flex-col items-start justify-center rounded-2xl ${idx % 2 === 0 ? 'bg-gray-600' : 'bg-gray-700'} bg-clip-border px-3 py-4 shadow-3xl shadow-shadow-500 p-4`}
            >
              <div
                className="flex items-center"
                onKeyDown={(e) => useKeyDown(e, 'Enter', [() => window.open(item.user.html_url, '_blank')])}
                role="button"
                tabIndex={0}
                onClick={() => window.open(item.user.html_url, '_blank')}
              >
                <img
                  className="h-10 w-10 rounded-full mr-2 cursor-pointer"
                  src={item.user.avatar_url}
                  alt={item.user.login}
                />
                <div>
                  <p className="text-sm text-gray-0 font-bold">{item.user.login}</p>
                  <p className="text-xs text-gray-0 font-italic">
                    {item.created_at.slice(0, 10)}
                    {' '}
                    |
                    {' '}
                    <span className="font-bold">{item.created_at.slice(11, 16)}</span>
                    {' '}
                  </p>
                </div>
              </div>
              <div className="text-base font-medium text-gray-light px-4 pl-12">

                <ReactMarkdown
                  children={item.body}
                  rehypePlugins={[rehypeRaw, [rehypeHighlight, { subset: ['javascript', 'css', 'html'] }]]}
                  components={{
                    a: ({ node, ...props }) => (
                      <a
                        {...props}
                        style={{ color: 'blue' }}
                        target="_blank"
                        rel="noopener noreferrer"
                      />
                    ), // Style links differently
                    code: ({
                      node, inline, className, children, ...props
                    }) => {
                      const language = className && className.split('-')[1]; // Get language from className
                      if (!inline && language) {
                        return (
                          <pre>
                            <code {...props} className={`language-${language}`}>
                              {children}
                            </code>
                          </pre>
                        );
                      }
                      return <code {...props}>{children}</code>;
                    },
                  }}
                />
              </div>
            </div>
          </div>
        ))
      ) : ''}

      {/* Cards */}
      <div className="py-4">
        <h4 className="px-2 mt-2 text-lg font-bold text-white">
          Repo Description:
        </h4>
        <div className="mt-2 px-2 text-base text-gray-400">
          {/* {body} */}
          <ReactMarkdown>{description}</ReactMarkdown>
        </div>
      </div>
    </Card>
  );
};

RepoGeneralInfo.propTypes = {
  issue: PropTypes.node.isRequired,
};

export default RepoGeneralInfo;
