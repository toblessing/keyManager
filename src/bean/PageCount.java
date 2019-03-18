package bean;

import java.util.ArrayList;
import java.util.List;


public class PageCount {
	private int noteAllCount=-1;
	private int pageCount=-1;
	private int pageNoteCount=-1;
	private List allNote=null;
	
	
	
	public PageCount(List an, int pnc){
		allNote=an;
		noteAllCount=allNote.size();
		pageNoteCount=pnc;
		pageCount =(noteAllCount+pageNoteCount-1)/pageNoteCount;
	}

	public int getPageCount() {
		return pageCount;
	}
	
	public List getPageList(int tp){
		List list = new ArrayList();
		if (tp>pageCount) 
			tp=pageCount;
		
		if (tp<0) 
			tp=1;
		
		int i=(tp-1)*pageNoteCount;
		for (int j = 0; j < pageNoteCount; j++) {
			if(i<noteAllCount)
				list.add(allNote.get(i));
			else
				break;
			i++;
		}
		return list;
	}
}
