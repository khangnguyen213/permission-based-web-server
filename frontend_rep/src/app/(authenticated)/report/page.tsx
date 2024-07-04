'use client';

import { useEffect, useState } from 'react';
import { reportApi } from '@/service/reportApi';

function ReportView() {
  const [fileUrl, setFileUrl] = useState<string | null>(null);

  useEffect(() => {
    reportApi.viewReport().then((res) => {
      console.log(res);
      // Assuming res.data is an ArrayBuffer; if it's a base64 string, conversion will be different
      const blob = new Blob([res.data as BlobPart], {
        type: 'application/pdf',
      });
      const url = URL.createObjectURL(blob);
      setFileUrl(url);

      // Cleanup the object URL on component unmount
      return () => {
        URL.revokeObjectURL(url);
      };
    });
  }, []);

  return (
    <div>
      {fileUrl && (
        <object
          data={fileUrl}
          type="application/pdf"
          width="100%"
          height="600px"
        >
          <p>
            Your browser does not support PDFs.{' '}
            <a href={fileUrl}>Download the PDF</a>.
          </p>
        </object>
      )}
    </div>
  );
}

export default ReportView;
